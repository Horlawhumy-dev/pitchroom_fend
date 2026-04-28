import React from 'react';

const AIGovernanceFoundations: React.FC = () => {
  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen">
      {/* Header / Branding */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              <img src="/favicon.svg" alt="PitchRoom Logo" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">PitchRoom</h1>
              <p className="text-xs text-slate-500 uppercase tracking-widest">Public AI Trust Center</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
              Compliance: Ghana AI Strategy Ready
            </span>
            <button
              onClick={() => window.print()}
              className="text-sm bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-md transition-colors"
            >
              Export Pack
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Summary Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-2xl p-8 text-white shadow-xl">
            <h2 className="text-3xl font-bold mb-4">Our Commitment to Accountability</h2>
            <p className="text-blue-100 max-w-2xl text-lg mb-6 leading-relaxed">
              This public trust pack provides transparency into our governance, data ethics, and algorithmic accountability standards, aligned with the Ghana National AI Strategy.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="text-blue-200 text-xs font-semibold mb-1">DATA SOVEREIGNTY</div>
                <div className="text-sm">Ghana-Based Hosting & Control</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="text-blue-200 text-xs font-semibold mb-1">TRANSPARENCY</div>
                <div className="text-sm">Human-in-the-Loop Safeguards</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/20">
                <div className="text-blue-200 text-xs font-semibold mb-1">INCLUSIVITY</div>
                <div className="text-sm">Localized Context-Aware Logic</div>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Day 2: Governance & Risk */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-white text-sm font-bold">2</span>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Governance Foundations & Risk Management</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI Governance Statement */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full hover:transform hover:-translate-y-1 transition-transform">
              <h4 className="font-bold text-slate-800 mb-2">AI Governance Statement</h4>
              <p className="text-sm text-slate-500 mb-6 italic">High-level public commitment to ethical AI usage.</p>
              <div className="mt-auto">
                <label className="block border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50">
                  <input type="file" className="hidden" />
                  <span className="text-xs text-slate-400">Upload PDF / Link Document</span>
                </label>
              </div>
            </div>
            {/* AI Inventory List */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full hover:transform hover:-translate-y-1 transition-transform">
              <h4 className="font-bold text-slate-800 mb-2">AI Inventory List</h4>
              <p className="text-sm text-slate-500 mb-6 italic">Summary of internal AI models and systems.</p>
              <div className="mt-auto">
                <label className="block border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50">
                  <input type="file" className="hidden" />
                  <span className="text-xs text-slate-400">Upload CSV / PDF</span>
                </label>
              </div>
            </div>
            {/* Risk Escalation Map */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full hover:transform hover:-translate-y-1 transition-transform">
              <h4 className="font-bold text-slate-800 mb-2">Risk Escalation Map</h4>
              <p className="text-sm text-slate-500 mb-6 italic">Process for reporting and mitigating algorithmic risks.</p>
              <div className="mt-auto">
                <label className="block border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50">
                  <input type="file" className="hidden" />
                  <span className="text-xs text-slate-400">Upload Diagram / Workflow</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Day 3: Data & Applied Ethics */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-800 text-white text-sm font-bold">3</span>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Applied Ethics & Data Privacy</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Data Ethics Checklist */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full hover:transform hover:-translate-y-1 transition-transform">
              <h4 className="font-bold text-slate-800 mb-2">Data Ethics Checklist</h4>
              <p className="text-sm text-slate-500 mb-6 italic">Internal verification for ethical data sourcing/handling.</p>
              <div className="mt-auto">
                <label className="block border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50">
                  <input type="file" className="hidden" />
                  <span className="text-xs text-slate-400">Upload Checklist Result</span>
                </label>
              </div>
            </div>
            {/* Acceptable Use Policy */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full hover:transform hover:-translate-y-1 transition-transform">
              <h4 className="font-bold text-slate-800 mb-2">Acceptable Use Policy</h4>
              <p className="text-sm text-slate-500 mb-6 italic">Rules for user interaction with AI features.</p>
              <div className="mt-auto">
                <label className="block border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50">
                  <input type="file" className="hidden" />
                  <span className="text-xs text-slate-400">Upload Policy Document</span>
                </label>
              </div>
            </div>
            {/* Code of Ethics */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col h-full hover:transform hover:-translate-y-1 transition-transform">
              <h4 className="font-bold text-slate-800 mb-2">Code of Ethics</h4>
              <p className="text-sm text-slate-500 mb-6 italic">Company-wide standards for responsible AI development.</p>
              <div className="mt-auto">
                <label className="block border-2 border-dashed border-slate-300 rounded-lg p-4 text-center cursor-pointer transition-all hover:border-blue-500 hover:bg-blue-50">
                  <input type="file" className="hidden" />
                  <span className="text-xs text-slate-400">Upload Ethics Charter</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Day 4: Accountability & Disclosure */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold">4</span>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">Public Trust & Accountability</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Algorithmic Accountability Guideline */}
            <div className="bg-blue-50/50 p-8 rounded-xl border-2 border-blue-100 shadow-sm flex flex-col h-full ring-2 ring-blue-600 ring-offset-2 hover:transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-bold text-slate-800">Algorithmic Accountability Guideline</h4>
                <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">Procurement Ready</span>
              </div>
              <p className="text-sm text-slate-500 mb-6 italic">Public declaration of logic, API dependencies, and data sovereignty.</p>
              <div className="mt-auto">
                <label className="block border-2 border-dashed border-blue-300 bg-white rounded-lg p-8 text-center cursor-pointer transition-all hover:bg-blue-50">
                  <input type="file" className="hidden" />
                  <span className="text-sm font-semibold text-blue-600 block mb-1">Click to Upload Accountability Pack</span>
                  <span className="text-xs text-slate-400">Required: Third-party APIs & Hosting Details</span>
                </label>
              </div>
            </div>
            {/* Customer Disclosure Statement */}
            <div className="bg-blue-50/50 p-8 rounded-xl border-2 border-blue-100 shadow-sm flex flex-col h-full ring-2 ring-blue-600 ring-offset-2 hover:transform hover:-translate-y-1 transition-transform">
              <div className="flex items-center space-x-2 mb-2">
                <h4 className="font-bold text-slate-800">Customer Disclosure Statement</h4>
                <span className="bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">B2C/User Facing</span>
              </div>
              <p className="text-sm text-slate-500 mb-6 italic">Onboarding copy explaining AI interaction and human fallbacks.</p>
              <div className="mt-auto">
                <label className="block border-2 border-dashed border-blue-300 bg-white rounded-lg p-8 text-center cursor-pointer transition-all hover:bg-blue-50">
                  <input type="file" className="hidden" />
                  <span className="text-sm font-semibold text-blue-600 block mb-1">Click to Upload UI Screens/Copy</span>
                  <span className="text-xs text-slate-400">Must include fallback & bias control statements</span>
                </label>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-400 text-xs mb-4">Certified Public AI Trust Pack — Compiled for Studio Day 4 Demo Prep</p>
          <div className="flex justify-center space-x-6 grayscale opacity-50">
            <span className="text-[10px] font-bold text-slate-600 border border-slate-300 px-2 py-1">Pillar 4: Data Sovereignty</span>
            <span className="text-[10px] font-bold text-slate-600 border border-slate-300 px-2 py-1">Pillar 6: Ethical Governance</span>
            <span className="text-[10px] font-bold text-slate-600 border border-slate-300 px-2 py-1">ARISE Framework</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIGovernanceFoundations;