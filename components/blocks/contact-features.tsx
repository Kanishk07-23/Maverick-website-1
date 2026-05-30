import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Calendar, LucideIcon, MapIcon, Mail, Phone, ExternalLink } from 'lucide-react'
import { ReactNode } from 'react'

export function ContactFeatures({ formComponent }: { formComponent: ReactNode }) {
    return (
        <section className="py-16 md:py-32">
            <div className="mx-auto max-w-2xl lg:max-w-7xl">
                <div className="grid gap-4 lg:grid-cols-2">
                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={MapIcon}
                                title="Our Headquarters"
                                description="Mumbai, Maharashtra. Drop by for a coffee and let's discuss your next big idea."
                            />
                        </CardHeader>

                        <div className="relative mb-6 border-t border-dashed sm:mb-0">
                            <div className="absolute inset-0 [background:radial-gradient(125%_125%_at_50%_0%,transparent_40%,hsl(var(--muted)),white_125%)]"></div>
                            <div className="aspect-[76/59] p-1 px-6">
                                <img
                                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&auto=format&fit=crop&q=60"
                                    className="w-full h-full object-cover rounded-xl shadow-lg border border-gray-100"
                                    alt="Headquarters location"
                                />
                            </div>
                        </div>
                    </FeatureCard>

                    <FeatureCard>
                        <CardHeader className="pb-3">
                            <CardHeading
                                icon={Mail}
                                title="Send a Message"
                                description="Tell us about your project, and we'll get back to you shortly."
                            />
                        </CardHeader>

                        <div className="p-6">
                            {formComponent}
                        </div>
                    </FeatureCard>

                    <FeatureCard className="p-6 lg:col-span-2">
                        <p className="mx-auto my-6 max-w-md text-balance text-center text-2xl font-semibold text-gray-900">
                            Multiple ways to connect. Choose what works best for your team.
                        </p>

                        <div className="flex justify-center gap-6 overflow-hidden mt-8">
                            <CircularUI
                                label="Email Us"
                                circles={[{ pattern: 'border' }, { pattern: 'primary' }]}
                            />

                            <CircularUI
                                label="WhatsApp"
                                circles={[{ pattern: 'none' }, { pattern: 'blue' }]}
                            />

                            <CircularUI
                                label="LinkedIn"
                                circles={[{ pattern: 'blue' }, { pattern: 'none' }]}
                            />

                            <CircularUI
                                label="Book Meeting"
                                circles={[{ pattern: 'primary' }, { pattern: 'none' }]}
                                className="hidden sm:block"
                            />
                        </div>
                    </FeatureCard>
                </div>
            </div>
        </section>
    )
}

interface FeatureCardProps {
    children: ReactNode
    className?: string
}

const FeatureCard = ({ children, className }: FeatureCardProps) => (
    <Card className={cn('group relative rounded-none shadow-zinc-950/5', className)}>
        <CardDecorator />
        {children}
    </Card>
)

const CardDecorator = () => (
    <>
        <span className="border-blue-600 absolute -left-px -top-px block size-2 border-l-2 border-t-2"></span>
        <span className="border-blue-600 absolute -right-px -top-px block size-2 border-r-2 border-t-2"></span>
        <span className="border-blue-600 absolute -bottom-px -left-px block size-2 border-b-2 border-l-2"></span>
        <span className="border-blue-600 absolute -bottom-px -right-px block size-2 border-b-2 border-r-2"></span>
    </>
)

interface CardHeadingProps {
    icon: LucideIcon
    title: string
    description: string
}

const CardHeading = ({ icon: Icon, title, description }: CardHeadingProps) => (
    <div className="p-6">
        <span className="text-gray-500 font-bold uppercase tracking-wider text-xs flex items-center gap-2">
            <Icon className="size-4 text-blue-600" />
            {title}
        </span>
        <p className="mt-8 text-3xl font-semibold text-gray-900 leading-tight">{description}</p>
    </div>
)

interface CircleConfig {
    pattern: 'none' | 'border' | 'primary' | 'blue'
}

interface CircularUIProps {
    label: string
    circles: CircleConfig[]
    className?: string
}

const CircularUI = ({ label, circles, className }: CircularUIProps) => (
    <div className={className}>
        <div className="bg-gradient-to-b from-gray-200 size-fit rounded-2xl to-transparent p-px">
            <div className="bg-gradient-to-b from-white to-gray-50/50 relative flex aspect-square w-fit items-center -space-x-4 rounded-[15px] p-4">
                {circles.map((circle, i) => (
                    <div
                        key={i}
                        className={cn('size-7 rounded-full border sm:size-8', {
                            'border-gray-900': circle.pattern === 'none',
                            'border-gray-300 bg-[repeating-linear-gradient(-45deg,hsl(var(--border)),hsl(var(--border))_1px,transparent_1px,transparent_4px)]': circle.pattern === 'border',
                            'border-gray-900 bg-white bg-[repeating-linear-gradient(-45deg,black,black_1px,transparent_1px,transparent_4px)]': circle.pattern === 'primary',
                            'bg-white z-1 border-blue-500 bg-[repeating-linear-gradient(-45deg,theme(colors.blue.500),theme(colors.blue.500)_1px,transparent_1px,transparent_4px)]': circle.pattern === 'blue',
                        })}></div>
                ))}
            </div>
        </div>
        <span className="text-gray-500 font-medium mt-2 block text-center text-sm">{label}</span>
    </div>
)
