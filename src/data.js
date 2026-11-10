// 全部为虚构演示数据
export const patients = [
  { id: "p1", pid: "MRN-100231", dept: "Neurology", name: "Eleanor Ward", age: 67, sex: "F", bed: "12", dx: "Acute ischemic stroke", day: 3, status: "Critical",
    records: ["CT head: no hemorrhage", "NIHSS 8 on admission, 5 today", "Aspirin 300 mg daily, atorvastatin 40 mg", "BP 148/86, HR 78, SpO2 97%", "Admission note: sudden right-sided weakness, slurred speech", "Nursing note: no events overnight, arm strength improving, speech clearer"],
    src: { admission: [[4], [0], [0, 1]], course: [[2], [1], [5]], status: [[3], [5]], plan: [[2], [], [], [1]] },
    sections: {
      admission: "67-year-old woman admitted with sudden right-sided weakness and slurred speech. CT head showed no hemorrhage. Diagnosed with acute ischemic stroke; NIHSS 8 on admission.",
      course: "Started on aspirin 300 mg daily and atorvastatin 40 mg. Neurological deficit improving, NIHSS now 5. No new events overnight.",
      status: "Vitals stable: BP 148/86, HR 78, SpO2 97% on room air. Right arm strength improving; speech clearer.",
      plan: "Continue antiplatelet and statin. Physiotherapy and speech therapy review. [Not documented: swallow screen result] Repeat imaging if neurological status changes."
    } },
  { id: "p2", pid: "MRN-100236", dept: "Cardiology", name: "Daniel Okafor", age: 54, sex: "M", bed: "7", dx: "NSTEMI, post-PCI", day: 2, status: "Stable",
    records: ["Troponin peak 2.4 ng/mL", "PCI to LAD, stent placed", "Dual antiplatelet therapy started", "Chest pain free since procedure", "Admission note: chest pain, NSTEMI pathway", "Nursing note: access site clean, no hematoma, mobilising with assistance", "Obs: HR 76, BP 124/76"],
    src: { admission: [[4], [0]], course: [[1], [2], [3]], status: [[6], [5], [5]], plan: [[2], [], [], []] },
    sections: {
      admission: "54-year-old man admitted with chest pain. Troponin peaked at 2.4 ng/mL; diagnosed with NSTEMI.",
      course: "Underwent PCI to the LAD with stent placement. Dual antiplatelet therapy started. Chest pain free since the procedure.",
      status: "Hemodynamically stable. Access site clean, no hematoma. Mobilising with assistance.",
      plan: "Continue dual antiplatelet therapy and beta-blocker. Cardiac rehabilitation referral. [Not documented: echocardiogram result] Plan discharge in 24 to 48 hours if stable."
    } },
  { id: "p3", pid: "MRN-100240", dept: "Pulmonology", name: "Priya Raman", age: 72, sex: "F", bed: "3", dx: "Community-acquired pneumonia", day: 4, status: "Improving", failOnce: true,
    records: ["CXR: right lower lobe consolidation", "IV ceftriaxone day 4", "Temp 37.4 C, CRP falling", "Oxygen weaned to room air", "Admission note: fever, productive cough, breathlessness", "Obs: SpO2 95% on room air", "Nursing note: cough reducing, eating and drinking normally", "Family meeting note: daughter involved in discharge planning"],
    src: { admission: [[4], [0]], course: [[1], [2], [3]], status: [[2, 5], [6], [6]], plan: [[1], [], [7]] },
    sections: {
      admission: "72-year-old woman admitted with fever, productive cough and breathlessness. Chest X-ray showed right lower lobe consolidation; diagnosed with community-acquired pneumonia.",
      course: "Treated with IV ceftriaxone, now day 4. Fever resolved, CRP falling. Oxygen weaned to room air.",
      status: "Temperature 37.4 C, SpO2 95% on room air. Cough reducing. Eating and drinking normally.",
      plan: "Switch to oral antibiotics tomorrow if afebrile. [Not documented: follow-up chest X-ray date] Discharge planning with family."
    } },
  { id: "p4", pid: "MRN-100248", dept: "Cardiology", name: "Marcus Bell", age: 61, sex: "M", bed: "9", dx: "Atrial fibrillation", day: 2, status: "Stable",
    records: ["ECG: AF, ventricular rate 128", "Metoprolol IV then oral", "TSH normal", "Anticoagulation assessment pending", "Admission note: palpitations", "Obs: HR 84, BP 126/78, no symptoms at rest"],
    src: { admission: [[4], [0]], course: [[1], [5], [2]], status: [[5], [5]], plan: [[1], [], [3]] },
    sections: {
      admission: "61-year-old man admitted with palpitations. ECG showed atrial fibrillation with a ventricular rate of 128.",
      course: "Rate control with IV metoprolol, then oral. Heart rate now settled. TSH normal.",
      status: "Heart rate 84, BP 126/78. Asymptomatic at rest.",
      plan: "Continue oral beta-blocker. [Not documented: CHA2DS2-VASc score] Anticoagulation decision with cardiology."
    } },
  { id: "p5", pid: "MRN-100252", dept: "Neurology", name: "Sofie de Vries", age: 45, sex: "F", bed: "5", dx: "Migraine with aura", day: 1, status: "Stable",
    records: ["CT head: normal", "Neurological exam: no focal deficit", "Paracetamol and antiemetic given", "Pain score 7/10, now 3/10", "Triage note: severe headache after visual aura", "Nursing note: comfortable, eating and drinking"],
    src: { admission: [[4], [0]], course: [[2], [3]], status: [[1], [5]], plan: [[3], [], []] },
    sections: {
      admission: "45-year-old woman presented with severe headache preceded by visual aura. CT head was normal.",
      course: "Received paracetamol and an antiemetic. Pain score fell from 7/10 to 3/10.",
      status: "No focal neurological deficit. Comfortable, eating and drinking.",
      plan: "Discharge today if pain controlled. [Not documented: trigger history] Outpatient neurology follow-up."
    } }
];
export const titles = { admission: "Admission and diagnosis", course: "Treatment course", status: "Current status", plan: "Plan and follow-up" };
