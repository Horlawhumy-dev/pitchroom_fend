import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Layout } from "@/layouts/Layout";
import { Shield, BarChart3, Zap, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";

const Landing = () => {
  const { isAuthenticated } = useAuth();
  return (
    <Layout>
      <div className="flex flex-col gap-24 pb-20">
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center gap-8 pt-16 md:pt-24 px-4 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/5 text-brand-indigo border border-brand-indigo/10 text-xs font-medium"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-indigo opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-indigo"></span>
            </span>
            New: Venture Capital GPT-4 Powered
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-brand-indigo max-w-4xl"
          >
            Master your pitch before <span className="text-brand-blue">the meeting</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-[700px] text-lg md:text-xl text-brand-gray/80"
          >
            PitchRoom uses advanced AI to simulate real investor behavior, giving you the practice you need to close your next round with confidence.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            {isAuthenticated ? (
              <Button size="lg" asChild className="bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-md px-8 h-14 text-base font-semibold shadow-xl shadow-brand-indigo/20">
                <Link to="/dashboard">Go to Your Dashboard</Link>
              </Button>
            ) : (
              <Button size="lg" asChild className="bg-brand-indigo hover:bg-brand-indigo/90 text-white rounded-md px-8 h-14 text-base font-semibold shadow-xl shadow-brand-indigo/20">
                <Link to="/register">Start Practicing for Free</Link>
              </Button>
            )}
            <Button size="lg" variant="outline" className="h-14 px-8 text-base font-semibold group border-brand-gray/20">
              <Play className="mr-2 h-4 w-4 fill-current group-hover:text-brand-blue transition-colors" />
              See how it works
            </Button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-20 text-xs font-semibold uppercase tracking-widest text-brand-gray/40"
          >
            Trusted by founders from
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8 opacity-20 grayscale">
              <div className="h-8 w-24 bg-brand-gray rounded animate-pulse" />
              <div className="h-8 w-24 bg-brand-gray rounded animate-pulse" />
              <div className="h-8 w-24 bg-brand-gray rounded animate-pulse" />
              <div className="h-8 w-24 bg-brand-gray rounded animate-pulse" />
            </div>
          </motion.div>
        </section>

        {/* Simulation Section */}
        <section className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brand-indigo mb-4">Experience the Simulation</h2>
            <p className="text-brand-gray/60 max-w-2xl mx-auto">Simulate high-stakes meetings with sub-second latency.</p>
          </div>
          
          <motion.div 
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 40 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-brand-indigo/10 shadow-3xl bg-gradient-to-br from-brand-indigo to-brand-blue/80 p-1 md:p-2"
          >
            <div className="bg-[#2D2A5E] rounded-2xl overflow-hidden aspect-video relative">
              {/* Interface Header */}
              <div className="absolute top-0 w-full p-4 flex justify-between items-center border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-blue/20 border border-brand-blue/30 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-brand-blue/50" />
                  </div>
                  <div className="w-32 h-2 rounded bg-white/10" />
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                    <Play className="w-3 h-3 text-white/50" />
                  </div>
                  <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded">END PITCH</div>
                </div>
              </div>
              
              {/* Main Content Area Placeholder */}
              <div className="h-full flex items-center justify-center p-8">
                <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/10 mt-12">
                  <p className="text-white/80 text-sm italic">
                    "That's an interesting approach to the TAM, but how are you planning to defend against the incumbents in year 2?"
                  </p>
                </div>
              </div>

              {/* Live Overlay */}
              <div className="absolute bottom-6 right-6 w-full max-w-[240px]">
                <div className="bg-white rounded-xl shadow-2xl p-5 border border-brand-indigo/5">
                  <p className="text-[10px] font-bold text-brand-gray/40 uppercase tracking-wider mb-4">Live Feedback</p>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span>Confidence</span>
                        <span className="text-brand-green">94%</span>
                      </div>
                      <div className="h-1 bg-brand-gray/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "94%" }}
                          className="h-full bg-brand-green" 
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-semibold mb-1">
                        <span>Clarity</span>
                        <span className="text-brand-blue">72%</span>
                      </div>
                      <div className="h-1 bg-brand-gray/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: "72%" }}
                          className="h-full bg-brand-blue" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 max-w-6xl grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={<Zap className="w-6 h-6 text-brand-blue" />}
            title="Real-time AI Feedback"
            description="Get instantaneous critique on your body language, tone, and the substance of your answers as you speak."
            delay={0.1}
          />
          <FeatureCard 
            icon={<BarChart3 className="w-6 h-6 text-brand-blue" />}
            title="Diverse Investor Personalities"
            description="Practice against 50+ unique AI personas, from the aggressive 'Shark' to the data-obsessed 'Analyst'."
            delay={0.2}
          />
          <FeatureCard 
            icon={<Shield className="w-6 h-6 text-brand-blue" />}
            title="Deep Performance Analytics"
            description="Receive detailed post-pitch reports with transcriptions, sentiment analysis, and action items for improvement."
            delay={0.3}
          />
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 max-w-5xl mb-20">
          <motion.div 
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="bg-brand-indigo rounded-[32px] p-8 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-brand-indigo/30"
          >
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[radial-gradient(circle_at_50%_-20%,#3B82F6,transparent_70%)]" />
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
              Ready to raise your next round?
            </h2>
            <p className="text-white/60 mb-10 text-lg max-w-2xl mx-auto relative z-10">
              Join over 10,000 founders who have used PitchRoom to refine their story and secure over $1.2B in funding.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Button size="lg" className="bg-white text-brand-indigo hover:bg-white/90 font-bold px-10 h-14 rounded-xl">
                Join PitchRoom Today
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white/20 hover:bg-white/10 font-bold px-10 h-14 rounded-xl backdrop-blur-sm">
                Book a Demo
              </Button>
            </div>
            <p className="mt-8 text-white/40 text-xs font-semibold uppercase tracking-widest relative z-10">
              No credit card required. Free for your first 3 pitches.
            </p>
          </motion.div>
        </section>
      </div>
    </Layout>
  );
};

const FeatureCard = ({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) => (
  <motion.div 
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-3xl border border-brand-indigo/5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(30,27,75,0.08)] transition-all duration-300 flex flex-col items-start gap-4 group"
  >
    <div className="w-12 h-12 rounded-2xl bg-brand-blue/5 flex items-center justify-center group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-brand-indigo">{title}</h3>
    <p className="text-brand-gray/70 leading-relaxed text-sm">{description}</p>
    <div className="mt-auto group-hover:text-brand-blue transition-colors flex items-center text-sm font-semibold cursor-pointer">
      Learn more <span className="ml-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
    </div>
  </motion.div>
);

export default Landing;
