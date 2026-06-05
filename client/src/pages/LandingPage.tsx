import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  ScanLine, 
  TrendingDown, 
  Clock, 
  Smartphone, 
  Server, 
  Database,
  ArrowRight,
  AlertTriangle,
  PackageCheck,
  Building2,
  Home,
  Store,
  CheckCircle2,
  Lock,
  LayoutDashboard,
  Box,
  ShoppingCart,
  Cpu,
  Monitor,
  RefreshCw,
  CreditCard
} from "lucide-react";

// --- Custom Components for the Landing Page ---

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-emerald-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-600 p-1.5 rounded-lg">
            <ShieldCheck className="h-6 w-6 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-emerald-900 tracking-tight">
            ExpironGuard
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">How It Works</a>
          <a href="#snapshots" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Snapshots</a>
          <a href="#roadmap" className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors">Roadmap</a>
          <Link href="/auth">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all">
              Try Now
            </Button>
          </Link>
        </div>
        <div className="md:hidden">
          <Link href="/auth">
            <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full">
              Try Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  </nav>
);

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50 via-white to-white"></div>
    <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20 hidden lg:block">
      <div className="w-[600px] h-[600px] bg-emerald-300 rounded-full blur-3xl"></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <FadeIn>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-6 border border-emerald-200 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Smart Inventory Safety
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
            Smarter expiry tracking for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">safer products</span>.
          </h1>
          <p className="text-lg lg:text-xl text-slate-600 mb-8 max-w-xl leading-relaxed">
            ExpironGuard gives every product a digital safety profile through QR-based tracking. Instantly check expiry status and help shops manage inventory before products become waste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/auth">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white h-14 px-8 rounded-full shadow-lg hover:shadow-xl transition-all text-lg w-full sm:w-auto gap-2">
                Try Now <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <a href="#snapshots" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-14 px-8 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 w-full text-lg shadow-sm">
                View Snapshots
              </Button>
            </a>
          </div>
          
          <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 font-medium">
             <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500"/> Admin Ready</div>
             <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500"/> Instant QR Scan</div>
             <div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500"/> Zero Waste</div>
          </div>
        </FadeIn>
        
        <FadeIn delay={0.2} className="relative hidden lg:block">
           <div className="relative z-10 bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="flex justify-between items-center mb-6">
                 <div>
                    <h3 className="font-bold text-slate-800">Fresh Milk</h3>
                    <p className="text-sm text-slate-500">Dairy Category</p>
                 </div>
                 <div className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                   <AlertTriangle className="h-3 w-3" /> Expiring Soon
                 </div>
              </div>
              
              <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 mb-6">
                 <ScanLine className="h-32 w-32 text-emerald-200" />
              </div>
              
              <div className="space-y-3">
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Manufactured</span>
                    <span className="font-medium">02 June 2026</span>
                 </div>
                 <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Expiry Date</span>
                    <span className="font-medium text-amber-600">05 June 2026</span>
                 </div>
                 <div className="h-px bg-slate-100 my-2"></div>
                 <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl">View Nutritional Info</Button>
              </div>
           </div>
           
           {/* Floating stats card */}
           <div className="absolute -bottom-8 -left-8 z-20 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 animate-bounce" style={{animationDuration: '3s'}}>
              <div className="flex items-center gap-4">
                 <div className="bg-emerald-100 p-3 rounded-full">
                    <TrendingDown className="h-6 w-6 text-emerald-600" />
                 </div>
                 <div>
                    <p className="text-sm text-slate-500 font-medium">Waste Prevented</p>
                    <p className="text-2xl font-bold text-slate-800">1,204 kg</p>
                 </div>
              </div>
           </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const ProblemSolution = () => (
  <section className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">The problem with invisible expiry dates</h2>
        <p className="text-lg text-slate-600">Products expire unnoticed, families lose money, and shops waste perfectly good food because manual checking is slow and error-prone.</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <FadeIn delay={0.1}>
           <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 h-full">
             <div className="bg-red-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
               <AlertTriangle className="h-6 w-6 text-red-600" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">Unnoticed Expiry</h3>
             <p className="text-slate-600 leading-relaxed">Products often sit at the back of the shelf until it's too late. Millions of tons of food are wasted simply because we lose track of time.</p>
           </div>
        </FadeIn>
        <FadeIn delay={0.2}>
           <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 h-full">
             <div className="bg-amber-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
               <Clock className="h-6 w-6 text-amber-600" />
             </div>
             <h3 className="text-xl font-bold text-slate-900 mb-3">Slow Manual Checks</h3>
             <p className="text-slate-600 leading-relaxed">Shopkeepers spend hours manually checking dates on hundreds of items. It's inefficient, frustrating, and prone to human error.</p>
           </div>
        </FadeIn>
        <FadeIn delay={0.3}>
           <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 h-full relative overflow-hidden">
             <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-emerald-500 rounded-full opacity-10 blur-xl"></div>
             <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
               <ShieldCheck className="h-6 w-6 text-emerald-600" />
             </div>
             <h3 className="text-xl font-bold text-emerald-900 mb-3">The ExpironGuard Solution</h3>
             <p className="text-emerald-800/80 leading-relaxed">Digital profiles for every item. Scan to instantly know the status. Admins get a bird's-eye view of what needs to be sold first.</p>
           </div>
        </FadeIn>
      </div>
    </div>
  </section>
);

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-slate-900 text-white relative overflow-hidden">
     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50"></div>
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
           <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">How ExpironGuard Works</h2>
           <p className="text-slate-400 max-w-2xl mx-auto">A seamless workflow from warehouse to shopping trolley.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
             { step: "01", title: "Add Details", desc: "Admins enter product specs, dates, and info.", icon: <Database className="h-6 w-6 text-emerald-400" /> },
             { step: "02", title: "Generate QR", desc: "System creates a unique digital identity.", icon: <ScanLine className="h-6 w-6 text-emerald-400" /> },
             { step: "03", title: "Scan & Check", desc: "Users scan to instantly see expiry status.", icon: <Smartphone className="h-6 w-6 text-emerald-400" /> },
             { step: "04", title: "Act Early", desc: "Prevent waste by tracking items in the dashboard.", icon: <TrendingDown className="h-6 w-6 text-emerald-400" /> }
           ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                 <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 relative group hover:border-emerald-500/50 transition-colors">
                    <div className="text-5xl font-black text-slate-800 absolute top-4 right-4 z-0 transition-all group-hover:text-emerald-900/50">{item.step}</div>
                    <div className="bg-slate-800 w-12 h-12 rounded-xl flex items-center justify-center border border-slate-700 mb-6 relative z-10 group-hover:scale-110 transition-transform">
                       {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 relative z-10">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed relative z-10">{item.desc}</p>
                 </div>
              </FadeIn>
           ))}
        </div>
     </div>
  </section>
);

const Snapshots = () => (
  <section id="snapshots" className="py-24 bg-slate-50">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
           <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">A complete look inside ExpironGuard</h2>
           <p className="text-slate-600 max-w-2xl mx-auto text-lg">Clean, responsive, and powerful interfaces built for speed.</p>
        </div>
        
        <div className="space-y-24">
           {/* Snapshot 1: Admin Dashboard */}
           <FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <div className="order-2 lg:order-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
                       <LayoutDashboard className="h-3.5 w-3.5" /> Admin
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Admin Dashboard</h3>
                    <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                       Track safe, expiring, and expired products from one central hub. Generate QR codes, view high-level metrics, and manage inventory seamlessly.
                    </p>
                    <ul className="space-y-3">
                       {["Live inventory metrics", "Instant QR generation", "Expiry categorization"].map((f, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                             <CheckCircle2 className="h-5 w-5 text-emerald-500" /> {f}
                          </li>
                       ))}
                    </ul>
                 </div>
                 
                 {/* Mock UI: Admin */}
                 <div className="order-1 lg:order-2 bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden transform transition-all hover:scale-[1.02]">
                    <div className="bg-slate-900 px-4 py-3 flex items-center gap-2">
                       <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div><div className="w-3 h-3 rounded-full bg-amber-500"></div><div className="w-3 h-3 rounded-full bg-green-500"></div></div>
                       <div className="mx-auto bg-slate-800 text-slate-400 text-xs px-24 py-1 rounded">ExpironGuard.app/admin</div>
                    </div>
                    <div className="p-6 bg-slate-50">
                       <div className="flex justify-between items-center mb-6">
                          <div className="font-bold text-lg text-slate-800">Inventory Overview</div>
                          <Button size="sm" className="bg-emerald-600 text-white rounded-md h-8 text-xs">Add Product</Button>
                       </div>
                       <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                             <div className="text-slate-500 text-xs mb-1">Total</div>
                             <div className="text-2xl font-bold text-slate-800">142</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm bg-amber-50/30">
                             <div className="text-amber-600 text-xs mb-1">Expiring Soon</div>
                             <div className="text-2xl font-bold text-amber-700">18</div>
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-red-200 shadow-sm bg-red-50/30">
                             <div className="text-red-600 text-xs mb-1">Expired</div>
                             <div className="text-2xl font-bold text-red-700">3</div>
                          </div>
                       </div>
                       <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                          <div className="grid grid-cols-4 bg-slate-100 p-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
                             <div className="col-span-2">Product</div>
                             <div>Status</div>
                             <div>Action</div>
                          </div>
                          <div className="p-3 border-b border-slate-100 grid grid-cols-4 items-center text-sm">
                             <div className="col-span-2 font-medium text-slate-800">Fresh Milk</div>
                             <div><span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs">Expiring</span></div>
                             <div className="text-indigo-600 font-medium text-xs">Manage</div>
                          </div>
                          <div className="p-3 grid grid-cols-4 items-center text-sm">
                             <div className="col-span-2 font-medium text-slate-800">Wheat Bread</div>
                             <div><span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs">Safe</span></div>
                             <div className="text-indigo-600 font-medium text-xs">Manage</div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </FadeIn>
           
           {/* Snapshot 2: QR Scan */}
           <FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <div className="order-2">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
                       <Smartphone className="h-3.5 w-3.5" /> Mobile View
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">QR Product Check</h3>
                    <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                       Users or shop staff can scan a product and instantly view whether it is safe to consume or needs to be prioritized.
                    </p>
                    <ul className="space-y-3">
                       {["Camera-based scanning", "Instant safety badge", "Detailed nutritional info"].map((f, i) => (
                          <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                             <CheckCircle2 className="h-5 w-5 text-emerald-500" /> {f}
                          </li>
                       ))}
                    </ul>
                 </div>
                 
                 {/* Mock UI: Mobile Scan */}
                 <div className="order-1 flex justify-center">
                    <div className="w-[300px] h-[600px] bg-slate-900 rounded-[2.5rem] border-[8px] border-slate-800 shadow-2xl overflow-hidden relative">
                       <div className="absolute top-0 w-full h-6 flex justify-center z-20">
                          <div className="w-1/3 h-full bg-slate-800 rounded-b-xl"></div>
                       </div>
                       <div className="w-full h-full bg-white relative overflow-y-auto pb-10">
                          <div className="bg-slate-900 h-48 rounded-b-3xl relative overflow-hidden flex flex-col items-center justify-center pt-8">
                             <ScanLine className="h-16 w-16 text-emerald-400 opacity-50 mb-2" />
                             <div className="text-white font-medium text-sm">Scanning...</div>
                          </div>
                          
                          <div className="px-5 -mt-8 relative z-10">
                             <div className="bg-white rounded-2xl shadow-xl p-5 border border-slate-100">
                                <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center mb-4 animate-pulse">
                                   <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                                   <div className="text-red-800 font-bold text-lg">EXPIRED</div>
                                   <div className="text-red-600 text-xs">Do not consume</div>
                                </div>
                                
                                <h4 className="font-bold text-slate-900 text-xl mb-1">Strawberry Yogurt</h4>
                                <p className="text-slate-500 text-sm mb-4">Dairy Product</p>
                                
                                <div className="space-y-2 mb-4">
                                   <div className="flex justify-between text-sm">
                                      <span className="text-slate-500">Mfg Date</span>
                                      <span className="font-medium">01 Sep 2023</span>
                                   </div>
                                   <div className="flex justify-between text-sm">
                                      <span className="text-slate-500">Exp Date</span>
                                      <span className="font-bold text-red-600">10 Sep 2023</span>
                                   </div>
                                </div>
                                <Button className="w-full bg-slate-100 text-slate-800 hover:bg-slate-200">Remove from Shelf</Button>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
           </FadeIn>
           
           {/* Snapshot 3: Authentication */}
           <FadeIn>
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                 <div className="order-2 lg:order-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-4">
                       <Lock className="h-3.5 w-3.5" /> Auth
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">Secure Login Experience</h3>
                    <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                       A frictionless entry point. Admins log in securely, while users can enter via a simple Custom ID (like a loyalty card) to track their trolley.
                    </p>
                 </div>
                 
                 {/* Mock UI: Login */}
                 <div className="order-1 lg:order-2 bg-slate-50 p-8 rounded-3xl border border-slate-200 flex justify-center items-center">
                    <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl p-6 border border-slate-100">
                       <div className="text-center mb-6">
                          <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3">
                             <ShieldCheck className="h-6 w-6 text-emerald-600" />
                          </div>
                          <h4 className="font-bold text-xl text-slate-900">Welcome to ExpironGuard</h4>
                          <p className="text-sm text-slate-500">Enter your credentials to continue</p>
                       </div>
                       <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                          <div className="w-1/2 bg-white text-center py-1.5 text-sm font-medium rounded-md shadow-sm">User</div>
                          <div className="w-1/2 text-center py-1.5 text-sm font-medium text-slate-500">Admin</div>
                       </div>
                       <div className="space-y-4 mb-6">
                          <div>
                             <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">Custom ID / Aadhaar</label>
                             <div className="h-10 mt-1 w-full bg-slate-50 border border-slate-200 rounded-md flex items-center px-3 text-slate-400">e.g. 1234 5678</div>
                          </div>
                       </div>
                       <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">Login</Button>
                    </div>
                 </div>
              </div>
           </FadeIn>
        </div>
     </div>
  </section>
);

const RaspberryPiIntegration = () => (
  <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
     {/* Background glow */}
     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-emerald-900/30 rounded-[100%] blur-[120px] pointer-events-none"></div>
     
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-emerald-400 text-sm font-semibold mb-4 border border-slate-700">
             <Cpu className="h-4 w-4" /> Hardware Extension
           </div>
           <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Smart Trolley & Raspberry Pi</h2>
           <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
             ExpironGuard goes beyond the web. It can be extended into a smart retail trolley where a Raspberry Pi acts as the central brain.
           </p>
        </div>

        {/* Visual Workflow */}
        <div className="mb-20 overflow-x-auto pb-4">
           <div className="flex items-center justify-between min-w-[800px] bg-slate-900/80 backdrop-blur border border-slate-800 p-6 rounded-2xl mx-auto max-w-5xl shadow-2xl">
              {[
                { name: "Product QR", icon: <Box className="h-6 w-6 text-slate-400" /> },
                { name: "Pi Scanner", icon: <ScanLine className="h-6 w-6 text-emerald-400" /> },
                { name: "ExpironGuard API", icon: <Server className="h-6 w-6 text-blue-400" /> },
                { name: "Expiry Check", icon: <ShieldCheck className="h-6 w-6 text-emerald-500" /> },
                { name: "Trolley Display", icon: <Monitor className="h-6 w-6 text-purple-400" /> },
                { name: "Dashboard Sync", icon: <RefreshCw className="h-6 w-6 text-teal-400" /> }
              ].map((step, i, arr) => (
                 <React.Fragment key={i}>
                    <div className="flex flex-col items-center gap-3 text-center w-24">
                       <div className="h-12 w-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700 shadow-inner">
                          {step.icon}
                       </div>
                       <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{step.name}</span>
                    </div>
                    {i < arr.length - 1 && (
                       <div className="h-0.5 w-12 bg-gradient-to-r from-slate-700 to-slate-600 relative">
                          <ArrowRight className="h-4 w-4 text-slate-500 absolute -right-2 -top-1.5" />
                       </div>
                    )}
                 </React.Fragment>
              ))}
           </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
           {[
             { title: "Raspberry Pi Controller", desc: "Acts as the central controller of the smart trolley, processing scans instantly.", icon: <Cpu className="h-5 w-5 text-emerald-400" /> },
             { title: "QR/Barcode Scanner", desc: "Reads product codes seamlessly using connected camera hardware.", icon: <ScanLine className="h-5 w-5 text-emerald-400" /> },
             { title: "Trolley Display", desc: "Shows product name, price, expiry date, safety status, and total cart value.", icon: <Monitor className="h-5 w-5 text-emerald-400" /> },
             { title: "Expiry Warning System", desc: "Visual alerts: Green (Safe), Amber (Expiring Soon), Red (Expired).", icon: <AlertTriangle className="h-5 w-5 text-emerald-400" /> },
             { title: "Dashboard Sync", desc: "Automatically updates the ExpironGuard web dashboard with trolley items.", icon: <RefreshCw className="h-5 w-5 text-emerald-400" /> },
             { title: "Smart Checkout Ready", desc: "Extends the app's existing trolley/cart flow into a physical checkout.", icon: <CreditCard className="h-5 w-5 text-emerald-400" /> }
           ].map((feature, i) => (
             <FadeIn delay={i * 0.1} key={i}>
                <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/50 transition-colors h-full">
                   <div className="bg-slate-800 w-10 h-10 rounded-lg flex items-center justify-center mb-4 border border-slate-700">
                      {feature.icon}
                   </div>
                   <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                   <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
             </FadeIn>
           ))}
        </div>

        <div className="text-center">
           <p className="text-xs text-slate-500 inline-block bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
              * Raspberry Pi trolley integration is presented as a prototype/future expansion concept unless physical hardware is connected.
           </p>
        </div>
     </div>
  </section>
);

const UseCases = () => (
  <section className="py-24 bg-white">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Built for every environment</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
           {[
             { icon: <Home />, title: "Families", desc: "Never guess if milk is bad." },
             { icon: <Store />, title: "Local Shops", desc: "Manage small inventory safely." },
             { icon: <ShoppingCart />, title: "Supermarkets", desc: "Audit hundreds of items fast." },
             { icon: <Building2 />, title: "Warehouses", desc: "Prioritize stock before shipping." }
           ].map((u, i) => (
             <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center hover:bg-emerald-50 hover:border-emerald-200 transition-colors cursor-default">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-emerald-600 shadow-sm mx-auto mb-4">
                   {u.icon}
                </div>
                <h4 className="font-bold text-slate-800 mb-1">{u.title}</h4>
                <p className="text-xs text-slate-500">{u.desc}</p>
             </div>
           ))}
        </div>
     </div>
  </section>
);

const TechStack = () => (
  <section className="py-16 bg-slate-900 border-t border-slate-800">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-8">Powered by modern web technology</p>
        <div className="flex flex-wrap justify-center gap-4">
           {["React", "Vite", "TypeScript", "Tailwind CSS", "Express.js", "PostgreSQL", "Drizzle ORM", "shadcn/ui"].map(tech => (
             <span key={tech} className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-full text-sm font-medium">
                {tech}
             </span>
           ))}
        </div>
     </div>
  </section>
);

const FounderBio = () => (
  <section className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
     <div className="absolute top-0 right-0 -mt-20 -mr-20 w-64 h-64 bg-emerald-50 rounded-full opacity-50 blur-3xl"></div>
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-semibold mb-4 border border-emerald-200">
             Meet the Builder
           </div>
           <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">Aaradhya Vanakhade</h2>
           <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
             Student Innovator, Developer, and Founder of ExpironGuard from SGIS.
           </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
           <div className="lg:col-span-2 space-y-8">
              <FadeIn>
                 <h3 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">About Me</h3>
                 <p className="text-slate-600 leading-relaxed mb-4">
                    I am Aaradhya Vanakhade, a student at SGIS and a young technology creator with a strong interest in artificial intelligence, web development, coding, product design, and innovation. I enjoy building projects that are not just visually attractive, but also useful in the real world.
                 </p>
                 <p className="text-slate-600 leading-relaxed mb-4">
                    My journey started with experimenting in coding and gradually grew into creating larger projects such as <strong>Bolton Programming Language</strong>, <strong>Spark AI Tools</strong>, <strong>ChitChat App</strong>, and now <strong>ExpironGuard</strong>. Each project helped me understand how technology can solve different types of problems, from learning and communication to automation and product safety.
                 </p>
                 <p className="text-slate-600 leading-relaxed">
                    ExpironGuard is one of my most practical innovations. It is designed to help families, shops, retailers, and supermarkets track product expiry dates using QR-based profiles to prevent expired-product usage and reduce waste.
                 </p>
              </FadeIn>

              <FadeIn delay={0.1}>
                 <h3 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">My Vision & Drive</h3>
                 <p className="text-slate-600 leading-relaxed mb-4">
                    My vision is to build smart, accessible, and meaningful technology that helps people in daily life. I want to create products that can support students, families, small businesses, and communities by making complex tasks easier, faster, and more reliable.
                 </p>
                 <p className="text-slate-600 leading-relaxed">
                    I am driven by the idea of creating technology that people can actually use. I like building projects that solve problems, look professional, and can be presented confidently in front of real users, teachers, judges, and communities.
                 </p>
              </FadeIn>
              
              <FadeIn delay={0.2}>
                 <div className="bg-slate-50 border-l-4 border-emerald-500 p-6 rounded-r-2xl italic text-slate-700 text-lg">
                    “I do not want to build projects that only look good. I want to build technology that solves real problems.”
                 </div>
              </FadeIn>
           </div>

           <div className="space-y-8">
              <FadeIn delay={0.2}>
                 <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
                    <h3 className="text-xl font-bold mb-6 text-emerald-400">Key Projects</h3>
                    <ul className="space-y-6">
                       <li>
                          <div className="font-bold text-lg">ExpironGuard</div>
                          <div className="text-sm text-slate-400 mt-1">Smart expiry and inventory safety system.</div>
                       </li>
                       <li>
                          <div className="font-bold text-lg">Bolton Lang</div>
                          <div className="text-sm text-slate-400 mt-1">Custom language design and logic.</div>
                       </li>
                       <li>
                          <div className="font-bold text-lg">Spark AI Tools</div>
                          <div className="text-sm text-slate-400 mt-1">AI-powered tools for productivity.</div>
                       </li>
                       <li>
                          <div className="font-bold text-lg">CoreSpark OS</div>
                          <div className="text-sm text-slate-400 mt-1">Fusion of Bolton’s logic and Spark’s AI.</div>
                       </li>
                    </ul>
                 </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                 <h3 className="text-xl font-bold text-slate-900 mb-4">Core Skills</h3>
                 <div className="flex flex-wrap gap-2">
                    {["Web Development", "AI Tooling", "Python", "HTML/CSS/JS", "UI/UX Design", "Product Thinking", "Automation", "QR Systems", "Problem Solving"].map(skill => (
                       <span key={skill} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium border border-emerald-100 shadow-sm">
                          {skill}
                       </span>
                    ))}
                 </div>
              </FadeIn>
           </div>
        </div>
     </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-center">
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-2 mb-6 opacity-50">
           <ShieldCheck className="h-6 w-6" />
           <span className="font-display text-xl font-bold tracking-tight text-white">ExpironGuard</span>
        </div>
        
        <div className="max-w-md mx-auto mb-8 bg-slate-900/50 p-4 rounded-xl border border-slate-800/50">
           <p className="text-xs text-slate-500 leading-relaxed text-left">
              <strong>Disclaimer:</strong> ExpironGuard’s expiry status is based on the product data entered into the system. Users should still follow official physical product labels, storage instructions, and general safety guidelines.
           </p>
        </div>
        
        <div className="mb-8">
           <p className="text-sm">
             Built as a student innovation project by <span className="font-bold text-emerald-400">Aaradhya Vanakhade</span>.
           </p>
        </div>
        
        <div className="flex justify-center gap-6 text-sm">
           <a href="#" className="hover:text-white transition">Home</a>
           <Link href="/auth" className="hover:text-emerald-400 transition text-emerald-500 font-medium">Try Now</Link>
        </div>
     </div>
  </footer>
);

export default function LandingPage() {
  return (
    <div className="min-h-screen font-sans selection:bg-emerald-200 selection:text-emerald-900 bg-white">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <Snapshots />
        <RaspberryPiIntegration />
        <UseCases />
        <TechStack />
        <FounderBio />
        
        {/* Call to action */}
        <section className="py-24 bg-emerald-600 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
           <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to make expiry tracking smarter?</h2>
              <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
                 Join the movement to reduce avoidable waste and protect consumers with verifiable, scannable data.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link href="/auth">
                    <Button size="lg" className="bg-white text-emerald-700 hover:bg-slate-50 h-14 px-8 rounded-full shadow-xl text-lg font-bold">
                       Try Now
                    </Button>
                 </Link>
              </div>
           </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
