"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, LucideIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: LucideIcon;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  // Responsive state
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);

  /**
   * Hydration guard: the rotation interval fires every 16 ms.
   * If it starts before React finishes hydrating, the computed node
   * positions (transform / opacity / zIndex) differ from the server
   * render (which used rotationAngle = 0) → hydration mismatch.
   * Setting canAnimate inside a useEffect ensures the interval only
   * starts after the first client-side commit.
   */
  const [canAnimate, setCanAnimate] = useState<boolean>(false);

  useEffect(() => {
    setCanAnimate(true);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      closeAll();
    }
  };

  const closeAll = () => {
    setExpandedItems({});
    setActiveNodeId(null);
    setPulseEffect({});
    setAutoRotate(true);
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (canAnimate && autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.1) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 16);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [canAnimate, autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const getRadius = () => {
    if (isMobile) return 110;
    if (isTablet) return 220;
    return 320; // Desktop
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = getRadius();
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "bg-gray-100 border-gray-300";
      case "in-progress":
        return "bg-white border-gray-200 shadow-sm";
      case "pending":
        return "bg-gray-50 border-gray-200 opacity-80";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  const renderCardContent = (item: TimelineItem, isMobileCard: boolean) => (
    <>
      {/* Connection Line (Hidden on Mobile) */}
      {!isMobileCard && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-gray-300"></div>
      )}
      
      {/* Close button for mobile */}
      {isMobileCard && (
        <button 
          onClick={(e) => { e.stopPropagation(); closeAll(); }}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full p-1 z-10"
        >
          <X size={14} />
        </button>
      )}

      <CardHeader className="pb-2 pt-5 md:pt-6">
        <div className="flex justify-between items-center pr-6 md:pr-0">
          <Badge
            className={`px-2 text-[10px] md:text-xs ${getStatusStyles(
              item.status
            )}`}
          >
            {item.status === "completed"
              ? "ACTIVE"
              : item.status === "in-progress"
              ? "GROWING"
              : "ONGOING"}
          </Badge>
          <span className="text-[10px] md:text-xs font-mono text-gray-500">
            {item.date}
          </span>
        </div>
        <CardTitle className="text-sm md:text-base mt-2 text-gray-900 pr-4">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-xs md:text-sm text-gray-600">
        <p>{item.content}</p>

        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="flex items-center text-gray-700">
              <Zap size={10} className="mr-1" />
              Impact Score
            </span>
            <span className="font-mono text-gray-800">{item.energy}%</span>
          </div>
          <div className="w-full h-1.5 md:h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9333ea] to-[#2563eb]"
              style={{ width: `${item.energy}%` }}
            ></div>
          </div>
        </div>

        {item.relatedIds.length > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center mb-2">
              <Link size={10} className="text-gray-500 mr-1" />
              <h4 className="text-[10px] md:text-xs uppercase tracking-wider font-medium text-gray-500">
                Connected Services
              </h4>
            </div>
            <div className="flex flex-wrap gap-1 md:gap-1.5">
              {item.relatedIds.map((relatedId) => {
                const relatedItem = timelineData.find(
                  (i) => i.id === relatedId
                );
                return (
                  <Button
                    key={relatedId}
                    variant="outline"
                    size="sm"
                    className="flex items-center h-7 md:h-6 px-2 py-0 text-[10px] md:text-xs rounded-md md:rounded-none border-gray-200 bg-gray-50 md:bg-transparent hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleItem(relatedId);
                    }}
                  >
                    {relatedItem?.title}
                    <ArrowRight
                      size={10}
                      className="ml-1 text-gray-400"
                    />
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </>
  );

  return (
    <div
      className="w-full min-h-[500px] md:min-h-[600px] lg:min-h-[800px] flex flex-col items-center justify-center bg-transparent overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Mobile background overlay when a card is open */}
      {isMobile && activeNodeId && (
        <div 
          className="fixed inset-0 bg-white/60 backdrop-blur-sm z-[250] transition-opacity duration-300"
          onClick={closeAll}
        />
      )}

      {/* Mobile Fixed Card - Rendered outside the orbit transform container */}
      {isMobile && activeNodeId && (() => {
        const item = timelineData.find(i => i.id === activeNodeId);
        if (!item) return null;
        return (
          <div className="fixed inset-0 flex items-center justify-center z-[300] pointer-events-none">
            <Card 
              className="liquid-metal-card bg-transparent overflow-visible w-[90vw] max-w-sm pointer-events-auto"
              onClick={(e) => e.stopPropagation()} 
            >
              {renderCardContent(item, true)}
            </Card>
          </div>
        );
      })()}

      <div className="relative w-full max-w-5xl h-[500px] md:h-[600px] lg:h-[800px]">
        <div
          className="absolute w-full h-full"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Central Energy Core — metallic chrome pivot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full liquid-metal-card flex items-center justify-center z-10">
            <div className="absolute w-16 h-16 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border border-gray-300/30 animate-ping opacity-40"></div>
            <div
              className="absolute w-20 h-20 md:w-32 md:h-32 lg:w-36 lg:h-36 rounded-full border border-gray-200/20 animate-ping opacity-25"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full" style={{ background: 'linear-gradient(135deg, #d0d0d0 0%, #f8f8f8 40%, #a0a0a0 70%, #e0e0e0 100%)', boxShadow: '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.8)' }}></div>
          </div>

          {/* Outer Orbit Ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[440px] md:h-[440px] lg:w-[640px] lg:h-[640px] rounded-full liquid-metal-ring z-0"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              top: '50%',
              left: '50%',
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y}px))`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className={cn(
                  "absolute cursor-pointer",
                  autoRotate ? "transition-opacity duration-700" : "transition-all duration-700 ease-out"
                )}
                style={nodeStyle}
                suppressHydrationWarning
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Node Pulse Effect */}
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(147, 51, 234, 0.1) 0%, rgba(147, 51, 234, 0) 70%)`,
                    width: `${item.energy * (isMobile ? 0.3 : 0.5) + (isMobile ? 30 : 40)}px`,
                    height: `${item.energy * (isMobile ? 0.3 : 0.5) + (isMobile ? 30 : 40)}px`,
                    left: `-${(item.energy * (isMobile ? 0.3 : 0.5)) / 2}px`,
                    top: `-${(item.energy * (isMobile ? 0.3 : 0.5)) / 2}px`,
                  }}
                ></div>

                {/* The Node Itself */}
                <div
                  className={cn(
                    "liquid-metal-card w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center transition-all duration-300 transform",
                    isExpanded
                      ? "text-gray-900 shadow-lg shadow-purple-500/20"
                      : isRelated
                      ? "text-gray-800"
                      : "text-gray-500",
                    isExpanded ? (isMobile ? "scale-125" : "scale-150") : "",
                    isRelated && !isExpanded ? "animate-pulse" : "",
                  )}
                >
                  <Icon size={isMobile ? 16 : isTablet ? 18 : 20} />
                </div>

                {/* Node Title Text */}
                <div
                  className={`
                  absolute top-12 md:top-14 lg:top-16 whitespace-nowrap
                  text-xs lg:text-sm font-semibold tracking-wider
                  transition-all duration-300 left-1/2 -translate-x-1/2 pointer-events-none
                  ${isExpanded ? "opacity-0" : "text-gray-600 opacity-100"}
                `}
                >
                  {item.title}
                </div>

                {/* Desktop Expanded Card - Rendered inside the orbit loop */}
                {!isMobile && isExpanded && (
                  <Card 
                    className="liquid-metal-card absolute top-20 left-1/2 -translate-x-1/2 w-64 z-[250] bg-transparent overflow-visible"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {renderCardContent(item, false)}
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
