import React, { useState } from "react";
import axios from "axios";

const CreateGatePass = () => {
  const [gatePass, setGatePass] = useState({
    requestRefNo: "",
    sampleRefNo: "",
    from: ["HCM"],
    sampleRoute: "Direct from Madampe",
    gatePassNo: "",
    remarks: "",
    sampleInDate: "",
    sampleInTime: "",
    samples: [],
  });

  const [sampleForm, setSampleForm] = useState({
    sampleId: "",
    testMethod: "",
    unitNumber: "",
    results: {},
  });

  const addSample = () => {
    if (!sampleForm.sampleId) return;
    setGatePass((prev) => ({
      ...prev,
      samples: [...prev.samples, sampleForm],
    }));
    setSampleForm({ sampleId: "", testMethod: "", unitNumber: "", results: {} });
  };

  const removeSample = (index) => {
    setGatePass((prev) => ({
      ...prev,
      samples: prev.samples.filter((_, i) => i !== index),
    }));
  };

  const updateResult = (key, value) => {
    setSampleForm((prev) => ({
      ...prev,
      results: { ...prev.results, [key]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5001/api/sample/", gatePass);
      alert("Gate Pass Successfully Synchronized");
      setGatePass({
        requestRefNo: "",
        sampleRefNo: "",
        from: ["HCM"],
        sampleRoute: "Direct from Madampe",
        gatePassNo: "",
        remarks: "",
        sampleInDate: "",
        sampleInTime: "",
        samples: [],
      });
    } catch (err) {
      alert(err.response?.data?.message || "Transmission Error");
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] text-slate-700 font-sans flex">
      {/* Sidebar Navigation (Visual Only) */}
      <aside className="w-64 bg-[#0F172A] hidden lg:flex flex-col border-r border-slate-200">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-white font-medium text-lg tracking-tight flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
            LIMS Portal
          </h2>
        </div>
        <nav className="p-4 space-y-2">
          <div className="px-4 py-2 bg-blue-600/10 text-blue-400 rounded text-sm font-medium">Create Gate Pass</div>
          <div className="px-4 py-2 text-slate-400 hover:bg-slate-800 rounded text-sm font-normal cursor-not-allowed">Inventory</div>
          <div className="px-4 py-2 text-slate-400 hover:bg-slate-800 rounded text-sm font-normal cursor-not-allowed">Analytics</div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="text-xs font-normal text-slate-400">
            Operations / <span className="text-slate-900 font-medium">Gate Pass Entry</span>
          </div>
          <div className="flex items-center gap-4">
             <button 
              form="main-form"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs font-medium transition-all shadow-sm"
            >
              Authorize & Save
            </button>
          </div>
        </header>

        {/* Workspace */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto">
            <form id="main-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Row 1: Primary Metadata */}
              <div className="bg-white border border-slate-200 shadow-sm rounded-sm">
                <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50">
                  <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider">Logistics Declaration</h3>
                </div>
                <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-6">
                  <Input label="Request Reference" value={gatePass.requestRefNo} onChange={(v) => setGatePass({ ...gatePass, requestRefNo: v })} required />
                  <Input label="Sample Reference" value={gatePass.sampleRefNo} onChange={(v) => setGatePass({ ...gatePass, sampleRefNo: v })} required />
                  <Input label="Gate Pass Number" value={gatePass.gatePassNo} onChange={(v) => setGatePass({ ...gatePass, gatePassNo: v })} required />
                  <Select label="Origin Location" value={gatePass.from[0]} options={["HCM", "HCB", "HCM HCB"]} onChange={(v) => setGatePass({ ...gatePass, from: [v] })} />
                  <Select label="Dispatch Route" value={gatePass.sampleRoute} options={["Direct from Madampe", "Direct from Badalgama", "Through Wewalduwa"]} onChange={(v) => setGatePass({ ...gatePass, sampleRoute: v })} />
                  <Input label="Internal Remarks" value={gatePass.remarks} onChange={(v) => setGatePass({ ...gatePass, remarks: v })} />
                </div>
              </div>

              {/* Row 2: Sample Entry System */}
              <div className="grid grid-cols-12 gap-6">
                {/* Entry Panel */}
                <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 shadow-sm rounded-sm p-6 space-y-6 self-start">
                  <h3 className="text-xs font-medium text-blue-600 uppercase tracking-wider mb-4">Add Item</h3>
                  <Input label="Sample ID" value={sampleForm.sampleId} onChange={(v) => setSampleForm({ ...sampleForm, sampleId: v })} />
                  <Input label="Test Method" value={sampleForm.testMethod} onChange={(v) => setSampleForm({ ...sampleForm, testMethod: v })} />
                  <Input label="Unit Number" value={sampleForm.unitNumber} onChange={(v) => setSampleForm({ ...sampleForm, unitNumber: v })} />
                  
                  <div className="pt-4 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[11px] font-medium text-slate-400 uppercase">Analysis Data</span>
                      <button type="button" onClick={() => { const k = prompt("Parameter Name"); if(k) updateResult(k, ""); }} className="text-xs text-blue-600 hover:underline">+ New Key</button>
                    </div>
                    <div className="space-y-2">
                      {Object.entries(sampleForm.results).map(([k, v]) => (
                        <div key={k} className="flex gap-2">
                          <div className="w-1/2 bg-slate-50 border border-slate-200 px-2 py-1 text-[11px] font-medium flex items-center">{k}</div>
                          <input className="w-1/2 border border-slate-200 px-2 py-1 text-xs outline-none focus:border-blue-500" value={v} onChange={(e) => updateResult(k, e.target.value)} />
                        </div>
                      ))}
                    </div>
                  </div>

                  <button type="button" onClick={addSample} className="w-full bg-slate-800 text-white py-2 rounded text-xs font-medium hover:bg-slate-900 transition-colors mt-2">
                    Include in Register
                  </button>
                </div>

                {/* Live Data Registry */}
                <div className="col-span-12 lg:col-span-8 bg-white border border-slate-200 shadow-sm rounded-sm overflow-hidden flex flex-col">
                   <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between">
                    <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wider">Sample Registry</h3>
                    <span className="text-[10px] font-medium text-slate-400 uppercase">Real-time Dashboard</span>
                  </div>
                  <div className="flex-1 min-h-[400px]">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-slate-100 text-slate-400 bg-slate-50/30">
                          <th className="px-6 py-3 text-[10px] font-medium uppercase tracking-widest w-1/4">Identifier</th>
                          <th className="px-6 py-3 text-[10px] font-medium uppercase tracking-widest w-1/4">Specifications</th>
                          <th className="px-6 py-3 text-[10px] font-medium uppercase tracking-widest w-1/3">Parameters</th>
                          <th className="px-6 py-3 text-right text-[10px] font-medium uppercase tracking-widest">Manage</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {gatePass.samples.length === 0 ? (
                          <tr>
                            <td colSpan="4" className="px-6 py-12 text-center text-xs text-slate-300 italic font-normal">Registry is currently empty.</td>
                          </tr>
                        ) : (
                          gatePass.samples.map((s, i) => (
                            <tr key={i} className="hover:bg-blue-50/20 transition-colors">
                              <td className="px-6 py-4">
                                <span className="text-sm font-medium text-slate-900">{s.sampleId}</span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="text-[12px] text-slate-600 font-normal">{s.testMethod}</div>
                                <div className="text-[10px] text-slate-400 font-normal">Unit: {s.unitNumber}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-1">
                                  {Object.entries(s.results).map(([k, v]) => (
                                    <span key={k} className="text-[10px] border border-blue-100 bg-blue-50 text-blue-600 px-1.5 py-0.5 rounded-sm font-normal">
                                      {k}: {v}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button onClick={() => removeSample(i)} className="text-xs text-red-400 hover:text-red-600 font-normal">Delete</button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

// ERP-Standard Input Components
const Input = ({ label, value, onChange, placeholder, required = false }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-medium text-slate-500 uppercase tracking-tight">{label}</label>
    <input
      required={required}
      placeholder={placeholder}
      className="border border-slate-200 rounded-sm py-1.5 px-3 text-sm font-normal text-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-300"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

const Select = ({ label, value, options, onChange }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-medium text-slate-500 uppercase tracking-tight">{label}</label>
    <select
      className="border border-slate-200 rounded-sm py-1.5 px-3 text-sm font-normal text-slate-800 focus:border-blue-500 outline-none transition-all cursor-pointer bg-white"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);

export default CreateGatePass;