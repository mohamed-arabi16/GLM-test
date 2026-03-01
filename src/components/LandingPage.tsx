'use client'

import { useState, useEffect, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Building2, Star, ArrowRight, Menu, X } from 'lucide-react'
import WeirdCursor from '@/components/WeirdCursor'
import LanguageSwitcher from '@/components/LanguageSwitcher'

interface Property {
    id: number
    titleKey: string
    locationKey: string
    priceKey: string
    beds: number
    baths: number
    area: string
    image: string
}

export default function LandingPage() {
    const t = useTranslations()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    })

    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -200])
    const rotateScroll = useTransform(scrollYProgress, [0, 1], [0, 360])
    const scaleScroll = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 1.2])

    useEffect(() => {
        const handleScroll = () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const scrolled = (winScroll / height) * 100
            setScrollProgress(scrolled)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Scroll reveal animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        )

        document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-scale, .scroll-morph, .scroll-twist').forEach((el) => {
            observer.observe(el)
        })

        return () => observer.disconnect()
    }, [])

    const properties: Property[] = [
        {
            id: 1,
            titleKey: 'property.bosphorusVilla.title',
            locationKey: 'property.bosphorusVilla.location',
            priceKey: 'property.bosphorusVilla.price',
            beds: 5,
            baths: 4,
            area: '450m²',
            image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop'
        },
        {
            id: 2,
            titleKey: 'property.modernPenthouse.title',
            locationKey: 'property.modernPenthouse.location',
            priceKey: 'property.modernPenthouse.price',
            beds: 4,
            baths: 3,
            area: '280m²',
            image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
        },
        {
            id: 3,
            titleKey: 'property.historicYali.title',
            locationKey: 'property.historicYali.location',
            priceKey: 'property.historicYali.price',
            beds: 7,
            baths: 6,
            area: '620m²',
            image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
        }
    ]

    const navLinks = [
        { name: t('nav.properties'), href: '#properties' },
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.contact'), href: '#contact' }
    ]

    return (
        <div className="min-h-screen flex flex-col bg-background" ref={containerRef}>
            <WeirdCursor />

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary z-[10000]"
                style={{ scaleX: scrollProgress / 100 }}
            />

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass py-3">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-12">
                        {/* Logo */}
                        <motion.div
                            data-interactive
                            className="flex items-center space-x-2 cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Building2 className="w-8 h-8 text-primary" />
                            <span className="text-xl font-bold tracking-tight">
                                Yıldız<span className="text-primary">Emlak</span>
                            </span>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link, index) => (
                                <motion.a
                                    key={link.name}
                                    href={link.href}
                                    data-interactive
                                    className="text-sm font-medium hover:text-primary transition-colors"
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={{ scale: 1.1 }}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                            <LanguageSwitcher />
                            <motion.button
                                data-interactive
                                className="glass-button px-6 py-2 text-primary font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('nav.getInTouch')}
                            </motion.button>
                        </div>

                        {/* Mobile menu button */}
                        <motion.button
                            data-interactive
                            className="md:hidden p-2 glass-button rounded-lg"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                {mobileMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                    >
                                        <X className="w-6 h-6" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                    >
                                        <Menu className="w-6 h-6" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden border-t border-border/20 bg-background/50 backdrop-blur-xl overflow-hidden"
                        >
                            <div className="px-4 py-4 space-y-3">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        data-interactive
                                        className="block py-2 text-sm font-medium hover:text-primary transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                                <div className="pt-2">
                                    <LanguageSwitcher />
                                </div>
                                <motion.button
                                    data-interactive
                                    className="w-full glass-button px-6 py-2 text-primary font-medium mt-2"
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {t('nav.getInTouch')}
                                </motion.button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
                {/* Animated background blobs with parallax */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute top-20 left-10 w-72 h-72 bg-primary/10 animate-morph-blob parallax-slow"
                        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
                    />
                    <motion.div
                        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 animate-morph-blob"
                        style={{
                            animationDelay: '2s',
                            y: useTransform(scrollYProgress, [0, 1], [0, -150])
                        }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 animate-morph-blob"
                        style={{
                            animationDelay: '4s',
                            rotate: rotateScroll
                        }}
                    />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="space-y-8">
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center space-x-2 glass px-4 py-2 text-sm font-medium"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <MapPin className="w-4 h-4 text-primary" />
                            <span>{t('hero.badge')}</span>
                        </motion.div>

                        {/* Main heading */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                            <motion.span
                                className="block overflow-hidden"
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.3, type: 'spring' }}
                            >
                                {t('hero.title').split(' ').slice(0, 3).join(' ')}
                            </motion.span>
                            <motion.span
                                className="block text-primary overflow-hidden"
                                initial={{ y: 100 }}
                                animate={{ y: 0 }}
                                transition={{ delay: 0.4, type: 'spring' }}
                            >
                                {t('hero.title').split(' ').slice(3).join(' ')}
                            </motion.span>
                        </h1>

                        {/* Subtitle */}
                        <motion.p
                            className="max-w-2xl mx-auto text-lg text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            {t('hero.subtitle')}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <motion.button
                                data-interactive
                                className="glass-button group px-8 py-4 bg-primary/20 text-primary font-medium flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>{t('hero.exploreProperties')}</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                            <motion.button
                                data-interactive
                                className="glass-button px-8 py-4 font-medium"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {t('hero.watchStory')}
                            </motion.button>
                        </motion.div>

                        {/* Floating stats */}
                        <div className="flex justify-center items-center gap-12 pt-12">
                            {[
                                { value: '250+', label: t('hero.propertiesSold') },
                                { value: '15+', label: t('hero.yearsExperience') },
                                { value: '98%', label: t('hero.clientSatisfaction') }
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    className="text-center glass-card p-6 rounded-2xl scroll-morph"
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                >
                                    <motion.div
                                        className="text-4xl font-bold text-primary"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <div className="text-sm text-muted-foreground mt-2">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border-2 border-border rounded-full flex justify-center pt-2 glass">
                        <motion.div
                            className="w-1 h-2 bg-primary rounded-full"
                            animate={{ y: [0, 12, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                </motion.div>
            </section>

            {/* Featured Properties Section */}
            <section id="properties" className="py-24 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-transparent via-muted/20 to-transparent"
                    style={{ y: useTransform(scrollYProgress, [0.3, 0.6], [0, 100]) }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <motion.h2
                            className="text-4xl sm:text-5xl font-bold mb-4 scroll-reveal"
                            whileInView={{ visible: true } as any}
                        >
                            {t('properties.title')}
                        </motion.h2>
                        <motion.p
                            className="text-lg text-muted-foreground max-w-2xl mx-auto scroll-reveal"
                            whileInView={{ visible: true } as any}
                        >
                            {t('properties.subtitle')}
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {properties.map((property, index) => (
                            <motion.div
                                key={property.id}
                                data-interactive
                                className="group glass-card rounded-2xl overflow-hidden scroll-twist"
                                initial={{ opacity: 0, rotateY: 90 }}
                                whileInView={{ opacity: 1, rotateY: 0 }}
                                viewport={{ once: true, margin: '-100px' }}
                                transition={{ delay: index * 0.15, duration: 0.8 }}
                                whileHover={{ y: -10, scale: 1.02 }}
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <motion.img
                                        src={property.image}
                                        alt={t(property.titleKey)}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                    <motion.div
                                        className="absolute top-4 right-4 px-3 py-1 glass-button text-sm font-medium"
                                        initial={{ x: 100, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        {t(property.priceKey)}
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span>{t(property.locationKey)}</span>
                                    </div>
                                    <motion.h3
                                        className="text-xl font-bold group-hover:text-primary transition-colors"
                                        whileHover={{ x: 5 }}
                                    >
                                        {t(property.titleKey)}
                                    </motion.h3>

                                    {/* Features */}
                                    <div className="flex items-center justify-between pt-4 border-t border-border/20">
                                        <div className="flex items-center space-x-1 text-sm">
                                            <Building2 className="w-4 h-4 text-muted-foreground" />
                                            <span>{property.beds} {t('properties.beds')}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-sm">
                                            <span className="text-muted-foreground">{property.baths} {t('properties.baths')}</span>
                                        </div>
                                        <div className="flex items-center space-x-1 text-sm">
                                            <span className="text-muted-foreground">{property.area}</span>
                                        </div>
                                    </div>

                                    <motion.button
                                        data-interactive
                                        className="w-full glass-button py-3 text-sm font-medium mt-4"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {t('properties.viewDetails')}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        className="text-center mt-12"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <motion.button
                            data-interactive
                            className="glass-button px-8 py-4 font-medium"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {t('properties.viewAll')}
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Content */}
                        <div className="space-y-8">
                            <motion.div
                                className="scroll-reveal-left"
                                whileInView={{ visible: true } as any}
                            >
                                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                                    {t('about.title')}
                                </h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {t('about.description')}
                                </p>
                            </motion.div>

                            <div className="space-y-6">
                                {[
                                    {
                                        icon: <Star className="w-6 h-6" />,
                                        title: t('about.exclusiveAccess.title'),
                                        description: t('about.exclusiveAccess.description')
                                    },
                                    {
                                        icon: <MapPin className="w-6 h-6" />,
                                        title: t('about.localExpertise.title'),
                                        description: t('about.localExpertise.description')
                                    },
                                    {
                                        icon: <Building2 className="w-6 h-6" />,
                                        title: t('about.personalizedService.title'),
                                        description: t('about.personalizedService.description')
                                    }
                                ].map((feature, index) => (
                                    <motion.div
                                        key={index}
                                        data-interactive
                                        className="flex items-start space-x-4 p-4 glass-card rounded-xl scroll-reveal"
                                        style={{ transitionDelay: `${index * 0.1}s` }}
                                        whileInView={{ visible: true } as any}
                                        whileHover={{ x: 10, scale: 1.02 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <div className="flex-shrink-0 w-12 h-12 glass-button flex items-center justify-center text-primary rounded-xl">
                                            {feature.icon}
                                        </div>
                                        <div>
                                            <h3 className="font-bold mb-1">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Visual */}
                        <motion.div
                            className="relative scroll-reveal-right"
                            whileInView={{ visible: true } as any}
                            style={{ perspective: 1000 }}
                        >
                            <motion.div
                                className="aspect-square glass rounded-3xl animate-morph-blob"
                                style={{
                                    y: parallaxY,
                                    rotate: rotateScroll
                                }}
                            />
                            <motion.div
                                className="absolute inset-8 glass-card rounded-3xl p-8 flex flex-col justify-center space-y-6"
                                style={{ scale: scaleScroll }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="text-center">
                                    <motion.div
                                        className="text-6xl font-bold text-primary mb-2"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                    >
                                        250+
                                    </motion.div>
                                    <div className="text-muted-foreground">{t('hero.propertiesSold')}</div>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <motion.div
                                        className="glass-button p-4 rounded-xl"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                    >
                                        <div className="text-3xl font-bold">₺2.5B</div>
                                        <div className="text-sm text-muted-foreground">{t('about.totalValue')}</div>
                                    </motion.div>
                                    <motion.div
                                        className="glass-button p-4 rounded-xl"
                                        whileHover={{ scale: 1.1, rotate: -5 }}
                                    >
                                        <div className="text-3xl font-bold">500+</div>
                                        <div className="text-sm text-muted-foreground">{t('about.happyClients')}</div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 relative overflow-hidden">
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent"
                    style={{ y: useTransform(scrollYProgress, [0.7, 1], [0, -200]) }}
                />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Left: Contact Info */}
                        <div className="space-y-8">
                            <motion.div
                                className="scroll-reveal-left"
                                whileInView={{ visible: true } as any}
                            >
                                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                                    {t('contact.title')}
                                </h2>
                                <p className="text-lg text-muted-foreground">
                                    {t('contact.subtitle')}
                                </p>
                            </motion.div>

                            <div className="space-y-6">
                                {[
                                    {
                                        icon: <MapPin className="w-6 h-6" />,
                                        label: t('contact.visitUs'),
                                        value: t('address')
                                    },
                                    {
                                        icon: <Phone className="w-6 h-6" />,
                                        label: t('contact.callUs'),
                                        value: t('phone')
                                    },
                                    {
                                        icon: <Mail className="w-6 h-6" />,
                                        label: t('contact.emailUs'),
                                        value: t('email')
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        data-interactive
                                        className="flex items-center space-x-4 p-4 glass-card rounded-xl scroll-scale"
                                        style={{ transitionDelay: `${index * 0.1}s` }}
                                        whileInView={{ visible: true } as any}
                                        whileHover={{ x: 10, scale: 1.02 }}
                                    >
                                        <div className="w-12 h-12 glass-button flex items-center justify-center text-primary rounded-xl">
                                            {item.icon}
                                        </div>
                                        <div>
                                            <div className="text-sm text-muted-foreground">{item.label}</div>
                                            <div className="font-medium">{item.value}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <motion.div
                            className="glass-card p-8 rounded-2xl scroll-twist"
                            initial={{ opacity: 0, rotateX: -20 }}
                            whileInView={{ opacity: 1, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">{t('contact.yourName')}</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-3 glass-input rounded-xl focus:outline-none"
                                        placeholder={t('contact.enterName')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{t('contact.emailAddress')}</label>
                                    <input
                                        type="email"
                                        className="w-full px-4 py-3 glass-input rounded-xl focus:outline-none"
                                        placeholder={t('contact.enterEmail')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{t('contact.phoneNumber')}</label>
                                    <input
                                        type="tel"
                                        className="w-full px-4 py-3 glass-input rounded-xl focus:outline-none"
                                        placeholder={t('contact.enterPhone')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{t('contact.message')}</label>
                                    <textarea
                                        rows={4}
                                        className="w-full px-4 py-3 glass-input rounded-xl focus:outline-none resize-none"
                                        placeholder={t('contact.messagePlaceholder')}
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    data-interactive
                                    className="w-full glass-button px-8 py-4 bg-primary/20 text-primary font-medium"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {t('contact.sendMessage')}
                                </motion.button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="glass-dark py-12 mt-auto">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        {/* Brand */}
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <Building2 className="w-8 h-8 text-primary" />
                                <span className="text-xl font-bold">
                                    Yıldız<span className="text-primary">Emlak</span>
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {t('footer.description')}
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="font-bold mb-4">{t('footer.quickLinks')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#properties" className="hover:text-primary transition-colors">{t('nav.properties')}</a></li>
                                <li><a href="#about" className="hover:text-primary transition-colors">{t('nav.about')}</a></li>
                                <li><a href="#contact" className="hover:text-primary transition-colors">{t('nav.contact')}</a></li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="font-bold mb-4">{t('footer.services')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.buyProperty')}</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.sellProperty')}</a></li>
                                <li><a href="#" className="hover:text-primary transition-colors">{t('footer.propertyValuation')}</a></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="font-bold mb-4">{t('footer.contact')}</h4>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4" />
                                    <span>{t('phone')}</span>
                                </li>
                                <li className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4" />
                                    <span>{t('email')}</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-white/10 text-center text-sm text-muted-foreground">
                        <p>{t('footer.copyright')}</p>
                    </div>
                </div>
            </footer>
        </div>
    )
}
