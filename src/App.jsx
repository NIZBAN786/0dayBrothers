import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Shield, 
  Users, 
  BookOpen, 
  Globe, 
  Target, 
  CheckCircle, 
  AlertTriangle,
  Calendar,
  MessageSquare,
  Settings,
  Zap,
  Heart,
  Star,
  Code,
  Trophy,
  LogOut,
  User,
  Settings2
} from 'lucide-react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LoginModal from './components/auth/LoginModal'
import RegisterModal from './components/auth/RegisterModal'
import ProfileModal from './components/profile/ProfileModal'
// import logoA from './assets/logo_concept_A.png'
import logoB from './assets/logo_concept_B.png'
// import logoC from './assets/logo_concept_C.png'
import './App.css'

function AppContent() {
  const [selectedLogo] = useState(logoB)
  const [activeSection, setActiveSection] = useState('introduction')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const { user, logout, isAuthenticated } = useAuth()

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: BookOpen },
    { id: 'structure', title: 'Community Structure', icon: Settings },
    { id: 'rules', title: 'Core Rules', icon: Shield },
    { id: 'growth', title: 'Growth Strategies', icon: Target },
    { id: 'moderation', title: 'Moderation & Events', icon: Users },
    { id: 'safety', title: 'Legal & Safety', icon: AlertTriangle },
    { id: 'tools', title: 'Tools & Resources', icon: Zap },
    { id: 'guidelines', title: 'Best Practices', icon: CheckCircle },
    { id: 'outreach', title: 'Global Outreach', icon: Globe }
  ]

  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Ethical Hacking",
      description: "Learn and practice ethical hacking techniques in a safe, controlled environment."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Global Community",
      description: "Connect with like-minded security professionals from around the world."
    },
    {
      icon: <Code className="h-8 w-8 text-primary" />,
      title: "Tool Development",
      description: "Collaborate on open-source security tools and share your creations."
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "CTF Challenges",
      description: "Participate in Capture The Flag competitions and improve your skills."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-primary" />,
      title: "Learning Resources",
      description: "Access comprehensive tutorials, guides, and educational content."
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "Vulnerability Research",
      description: "Collaborate on responsible disclosure and vulnerability research."
    }
  ]

  const stats = [
    { number: "10K+", label: "Active Members" },
    { number: "500+", label: "CTF Challenges" },
    { number: "50+", label: "Countries" },
    { number: "24/7", label: "Community Support" }
  ]

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={selectedLogo} alt="0dayBrothers Logo" className="h-8 w-8 md:h-10 md:w-10" />
            <span className="text-lg md:text-2xl font-bold text-glow">0dayBrothers</span>
          </div>
          <div className="hidden lg:flex space-x-6">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#community" className="text-foreground hover:text-primary transition-colors">Community</a>
            <a href="#guidelines" className="text-foreground hover:text-primary transition-colors">Guidelines</a>
            <a href="#resources" className="text-foreground hover:text-primary transition-colors">Resources</a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">About</a>
          </div>
          <div className="flex space-x-2">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setShowProfileModal(true)}
                  className="text-sm px-3 py-2"
                >
                  <Settings2 className="h-4 w-4 mr-1" />
                  Profile
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={logout}
                  className="cyber-border text-sm px-3 py-2"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="cyber-border text-sm px-3 py-2"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </Button>
                <Button 
                  className="glow-effect text-sm px-3 py-2"
                  onClick={() => setShowRegisterModal(true)}
                >
                  Join Now
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-gradient py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="mb-8">
            <img src={selectedLogo} alt="0dayBrothers Logo" className="h-24 w-24 mx-auto mb-6 glow-effect rounded-full" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
              Welcome to <span className="text-primary">0dayBrothers</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              A beginner-friendly ethical hacking community focused on collaborative learning, 
              skill development, and responsible cybersecurity practices.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="glow-effect text-lg px-8 py-3" onClick={() => scrollToSection('introduction')}>
                <BookOpen className="w-4 h-4 mr-2" />
                Read Guidelines
              </Button>
              <Button size="lg" variant="outline" className="cyber-border text-lg px-8 py-3" onClick={() => scrollToSection('outreach')}>
                <Users className="w-4 h-4 mr-2" />
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="community" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Join 0dayBrothers?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our community offers everything you need to advance your cybersecurity skills and connect with fellow professionals.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-card/50 border-border hover:border-primary/50 transition-all duration-300 hover:glow-effect">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines Section */}
      <section id="guidelines" className="py-20 bg-card/30 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Community Guidelines</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive guidelines for building and managing our ethical hacking community
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Navigation Sidebar - Hidden on mobile */}
            <aside className="hidden lg:block w-64 sticky top-20 h-fit">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <nav className="space-y-2">
                    {sections.map((section) => {
                      const Icon = section.icon
                      return (
                        <Button
                          key={section.id}
                          variant={activeSection === section.id ? "default" : "ghost"}
                          className="w-full justify-start"
                          onClick={() => scrollToSection(section.id)}
                        >
                          <Icon className="w-4 h-4 mr-2" />
                          {section.title}
                        </Button>
                      )
                    })}
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Mobile Navigation - Visible only on mobile */}
            <div className="lg:hidden mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Navigation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {sections.slice(0, 6).map((section) => {
                      const Icon = section.icon
                      return (
                        <Button
                          key={section.id}
                          variant="outline"
                          size="sm"
                          className="justify-start text-xs"
                          onClick={() => scrollToSection(section.id)}
                        >
                          <Icon className="w-3 h-3 mr-1" />
                          {section.title}
                        </Button>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <main className="flex-1 space-y-8 min-w-0">
              
              {/* Introduction */}
              <section id="introduction">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5" />
                      Introduction
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      This document outlines the comprehensive guidelines for establishing, nurturing, and expanding the <strong>0dayBrothers</strong> community. 
                      Our primary objective is to create a safe, supportive, and educational environment for individuals interested in ethical hacking and cybersecurity, 
                      from beginners to more experienced practitioners.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      The community will focus on collaborative learning, skill development, and responsible engagement within the cybersecurity landscape. 
                      These guidelines are designed to ensure the community's sustainable growth, maintain a positive and respectful atmosphere, 
                      and uphold legal and ethical standards.
                    </p>
                  </CardContent>
                </Card>
              </section>

              {/* Community Structure */}
              <section id="structure">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Community Structure and Platform
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Platform Setup</h3>
                      <div className="grid gap-4">
                        <div className="flex items-start gap-3">
                          <MessageSquare className="w-5 h-5 mt-1 text-primary" />
                          <div>
                            <h4 className="font-medium">Discord Server</h4>
                            <p className="text-sm text-muted-foreground">Primary communication platform with dedicated channels for various topics</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 mt-1 text-primary" />
                          <div>
                            <h4 className="font-medium">Security Settings</h4>
                            <p className="text-sm text-muted-foreground">Two-Factor Authentication (2FA) and High Verification Level enabled</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Initial Channels</h3>
                      <div className="grid gap-3">
                        <Badge variant="outline" className="justify-start p-3">
                          <span className="font-mono">#welcome</span> - New member introductions and community rules
                        </Badge>
                        <Badge variant="outline" className="justify-start p-3">
                          <span className="font-mono">#resources</span> - Curated learning materials and tools
                        </Badge>
                        <Badge variant="outline" className="justify-start p-3">
                          <span className="font-mono">#general-chat</span> - Open discussions and networking
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Core Rules */}
              <section id="rules">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Core Community Rules
                    </CardTitle>
                    <CardDescription>
                      Essential guidelines that all members must follow to maintain a safe and respectful environment
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 border rounded-lg">
                        <AlertTriangle className="w-5 h-5 mt-1 text-red-500" />
                        <div>
                          <h4 className="font-semibold text-red-700 dark:text-red-400">No Illegal Hacking/Tools</h4>
                          <p className="text-sm text-muted-foreground">
                            Any discussion, sharing, or promotion of illegal hacking activities, malware, or tools used for illicit purposes is strictly prohibited.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 border rounded-lg">
                        <Heart className="w-5 h-5 mt-1 text-blue-500" />
                        <div>
                          <h4 className="font-semibold text-blue-700 dark:text-blue-400">Respect Everyone</h4>
                          <p className="text-sm text-muted-foreground">
                            Treat all members with respect and courtesy. Harassment, discrimination, hate speech, or personal attacks will not be tolerated.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 p-4 border rounded-lg">
                        <BookOpen className="w-5 h-5 mt-1 text-green-500" />
                        <div>
                          <h4 className="font-semibold text-green-700 dark:text-green-400">Beginner Questions Encouraged</h4>
                          <p className="text-sm text-muted-foreground">
                            This community is a learning space. Newcomers are encouraged to ask questions, no matter how basic they may seem.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Growth Strategies */}
              <section id="growth">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Growth and Recruitment Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Phase 1: Initial Recruitment (Days 1-15)</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Invite friends and colleagues interested in technology
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Post in beginner-friendly subreddits (r/HowToHack, r/LearnHacking)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Engage with cybersecurity Discord communities
                        </li>
                      </ul>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Phase 2: Sustained Growth (Days 16-60)</h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          Share free educational resources weekly
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          Maintain consistent social media presence (3x/week)
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          Engage daily with discussion questions
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Expected Growth Timeline</h4>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span>Month 1:</span>
                          <Badge variant="secondary">20-30 members</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Month 2:</span>
                          <Badge variant="secondary">50 members</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Month 3:</span>
                          <Badge variant="secondary">100+ members</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Moderation & Events */}
              <section id="moderation">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Moderation and Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Moderation</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-primary" />
                          <span className="text-sm">Appoint 1-2 trusted members as moderators</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Zap className="w-4 h-4 text-primary" />
                          <span className="text-sm">Use Carl-bot for automated moderation tasks</span>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Community Events</h3>
                      <div className="grid gap-4">
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Weekly Screen Share Saturday
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Watch members solve TryHackMe rooms together
                          </p>
                        </div>
                        <div className="border rounded-lg p-4">
                          <h4 className="font-medium flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            CTF Team-Ups
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Form teams for free CTF challenges like PicoCTF
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Legal & Safety */}
              <section id="safety">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Legal and Safety Guidelines
                    </CardTitle>
                    <CardDescription>
                      Maintaining strict adherence to legal and ethical boundaries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                      <h4 className="font-semibold text-red-700 dark:text-red-400 mb-2">Prohibited Activities</h4>
                      <ul className="space-y-1 text-sm text-red-600 dark:text-red-300">
                        <li>• Malware sharing or distribution</li>
                        <li>• Illegal hacking requests or "hack me" requests</li>
                        <li>• Any content violating Discord's Terms of Service</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <h4 className="font-semibold text-green-700 dark:text-green-400 mb-2">Encouraged Activities</h4>
                      <ul className="space-y-1 text-sm text-green-600 dark:text-green-300">
                        <li>• Ethical hacking education and discussion</li>
                        <li>• Responsible disclosure practices</li>
                        <li>• Legal penetration testing methodologies</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Tools & Resources */}
              <section id="tools">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Beginner-Friendly Tools and Resources
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Purpose</th>
                            <th className="text-left p-2">Tool</th>
                            <th className="text-left p-2">Why?</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b">
                            <td className="p-2">Chat</td>
                            <td className="p-2 font-mono">Discord</td>
                            <td className="p-2 text-muted-foreground">Free, easy, mobile-friendly</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">File Sharing</td>
                            <td className="p-2 font-mono">Google Drive</td>
                            <td className="p-2 text-muted-foreground">No installation needed</td>
                          </tr>
                          <tr className="border-b">
                            <td className="p-2">Learning Platform</td>
                            <td className="p-2 font-mono">TryHackMe</td>
                            <td className="p-2 text-muted-foreground">Gamified, browser-based</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-6 space-y-3">
                      <h4 className="font-semibold">Recommended Learning Resources</h4>
                      <div className="grid gap-2">
                        <Badge variant="outline" className="justify-start p-3">
                          <BookOpen className="w-4 h-4 mr-2" />
                          TryHackMe (Free learning paths)
                        </Badge>
                        <Badge variant="outline" className="justify-start p-3">
                          <Target className="w-4 h-4 mr-2" />
                          OverTheWire (Beginner CTFs)
                        </Badge>
                        <Badge variant="outline" className="justify-start p-3">
                          <Users className="w-4 h-4 mr-2" />
                          YouTube: NetworkChuck, John Hammond
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Best Practices */}
              <section id="guidelines">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Monthly Checklist for Community Growth
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Badge variant="secondary">Week 1</Badge>
                        <span className="text-sm">Share 1 new learning resource</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Badge variant="secondary">Week 2</Badge>
                        <span className="text-sm">Host 1 casual voice chat session</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Badge variant="secondary">Week 3</Badge>
                        <span className="text-sm">Recruit in 2 new online spaces</span>
                      </div>
                      <div className="flex items-center gap-3 p-3 border rounded-lg">
                        <Badge variant="secondary">Week 4</Badge>
                        <span className="text-sm">Ask members: "What should we learn next month?"</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* Global Outreach */}
              <section id="outreach">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Global Outreach and Recruitment Strategies
                    </CardTitle>
                    <CardDescription>
                      Expanding the community worldwide with inclusive practices
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Expanding Reach</h3>
                      <div className="grid gap-4">
                        <div className="flex items-start gap-3">
                          <Globe className="w-5 h-5 mt-1 text-primary" />
                          <div>
                            <h4 className="font-medium">Language Inclusivity</h4>
                            <p className="text-sm text-muted-foreground">Consider dedicated channels for non-English speakers</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Users className="w-5 h-5 mt-1 text-primary" />
                          <div>
                            <h4 className="font-medium">Regional Ambassadors</h4>
                            <p className="text-sm text-muted-foreground">Identify active members from different regions as ambassadors</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <BookOpen className="w-5 h-5 mt-1 text-primary" />
                          <div>
                            <h4 className="font-medium">Educational Partnerships</h4>
                            <p className="text-sm text-muted-foreground">Collaborate with universities and cybersecurity bootcamps</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="text-center p-6 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
                      <h3 className="text-xl font-semibold mb-2">Ready to Join 0dayBrothers?</h3>
                      <p className="text-muted-foreground mb-4">
                        Start your ethical hacking journey with our supportive community
                      </p>
                      <Button size="lg" className="glow-effect">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Join Discord Community
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </section>

            </main>
          </div>
        </div>
      </section>

      {/* Community Values Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Core Values</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built on a foundation of ethics, collaboration, and continuous learning.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <Badge variant="outline" className="text-lg px-4 py-2 mb-4 cyber-border">Ethics First</Badge>
              <p className="text-muted-foreground">
                We uphold the highest ethical standards in all hacking activities, promoting responsible disclosure and using skills for good.
              </p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-lg px-4 py-2 mb-4 cyber-border">Knowledge Sharing</Badge>
              <p className="text-muted-foreground">
                Open exchange of information, mutual support, and collective problem-solving drive our community forward.
              </p>
            </div>
            <div className="text-center">
              <Badge variant="outline" className="text-lg px-4 py-2 mb-4 cyber-border">Continuous Learning</Badge>
              <p className="text-muted-foreground">
                We foster an environment that promotes ongoing skill development, research, and adaptation to new threats.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join the Brotherhood?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Become part of a global community dedicated to advancing cybersecurity through ethical hacking and collaboration.
          </p>
          <Button size="lg" className="glow-effect text-lg px-8 py-3">
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <img src={selectedLogo} alt="0dayBrothers Logo" className="h-8 w-8" />
                <span className="text-xl font-bold">0dayBrothers</span>
              </div>
              <p className="text-muted-foreground">
                Empowering ethical hackers worldwide through community, education, and collaboration.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Forums</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Mentorship</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">CTF Archive</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Tools</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Mission</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 0dayBrothers. All rights reserved. Built with ❤️ for the cybersecurity community.</p>
          </div>
        </div>
      </footer>

      {/* Authentication Modals */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false)
          setShowRegisterModal(true)
        }}
      />
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false)
          setShowLoginModal(true)
        }}
      />
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App

