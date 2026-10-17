import type { CourseItem, EntryQuestion, TradeId } from '../types';

// ==============================================================
// 1. ENTRY-LEVEL ASSESSMENT QUESTIONS (Deterministic 10 Qs each)
// ==============================================================

export const entryAssessmentQuestions: Record<TradeId, EntryQuestion[]> = {
  Electrician: [
    {
      id: 1,
      trade: 'Electrician',
      question: 'Before starting any repair work on an energized main distribution board, what is the mandatory first safety step?',
      options: [
        'Wear leather gloves and turn on the exhaust fan',
        'Isolate the main MCB/isolator switch, lock out/tag out, and verify zero voltage with an insulation-rated multimeter',
        'Directly cut the phase wire using regular insulated pliers',
        'Pour sand on the board to discharge static electricity'
      ],
      correctIndex: 1,
      explanation: 'Isolation, Lockout/Tagout (LOTO), and zero-voltage verification prevent electrical shock and arc flashes.',
      category: 'Safety'
    },
    {
      id: 2,
      trade: 'Electrician',
      question: 'In standard Indian domestic wiring (IS 732), which color code is designated for the protective earth conductor?',
      options: [
        'Red',
        'Black',
        'Green or Green with Yellow stripe',
        'Dark Blue'
      ],
      correctIndex: 2,
      explanation: 'Indian standard wiring codes designate Green or Green-Yellow for Earth, Red/Yellow/Blue for Phases, and Black for Neutral.',
      category: 'Basic Knowledge'
    },
    {
      id: 3,
      trade: 'Electrician',
      question: 'A customer reports that a 16A MCB trips repeatedly whenever both the geyser and microwave operate at the same time. What is the most likely cause?',
      options: [
        'Circuit overload beyond the 16 Amp rated thermal limit of the breaker',
        'Earth pit resistance has dropped to 0 ohms',
        'The voltage supply is too clean',
        'The switchboard is painted with non-metallic paint'
      ],
      correctIndex: 0,
      explanation: 'Running high-wattage appliances simultaneously on a single circuit exceeds the branch MCB current rating.',
      category: 'Practical Scenario'
    },
    {
      id: 4,
      trade: 'Electrician',
      question: 'What is the acceptable maximum safe resistance for a domestic earthing pit under standard electrical inspection rules?',
      options: [
        '50 to 100 Ohms',
        'Less than 5 Ohms (ideally 1 to 2 Ohms)',
        'Zero micro-ohms only',
        'Above 250 Ohms'
      ],
      correctIndex: 1,
      explanation: 'For domestic and commercial installations, earth electrode resistance should generally not exceed 5 Ohms for effective fault clearing.',
      category: 'Basic Knowledge'
    },
    {
      id: 5,
      trade: 'Electrician',
      question: 'Which instrument is specifically used to test the insulation resistance between conductor wires and ground?',
      options: [
        'Digital Clamp Meter only',
        'Megohmmeter (Megger / Insulation Resistance Tester)',
        'Frequency Counter',
        'Non-contact Infrared Thermometer'
      ],
      correctIndex: 1,
      explanation: 'A Megohmmeter (Megger) applies a high DC test voltage (typically 500V or 1000V) to evaluate conductor dielectric integrity.',
      category: 'Basic Knowledge'
    },
    {
      id: 6,
      trade: 'Electrician',
      question: 'When installing wiring inside an industrial metal conduit, what must be done at all conduit junction boxes?',
      options: [
        'Ensure continuous mechanical bonding and earthing across all metal conduit sections',
        'Fill conduits with water to prevent heating',
        'Wrap joints with standard PVC packaging tape only',
        'Leave bare copper conductors exposed for cooling'
      ],
      correctIndex: 0,
      explanation: 'Continuous metal conduit earthing prevents metal tubing from becoming live during an insulation failure.',
      category: 'Safety'
    },
    {
      id: 7,
      trade: 'Electrician',
      question: 'In a 3-phase star-delta starter setup, what does the starter achieve during motor start-up?',
      options: [
        'Increases starting current by 300%',
        'Reduces starting current and initial torque to prevent line voltage dip',
        'Converts AC directly into high-voltage DC',
        'Eliminates the need for motor thermal overload protection'
      ],
      correctIndex: 1,
      explanation: 'Star connection supplies 1/√3 (58%) line voltage per phase at startup, drastically reducing inrush current.',
      category: 'Troubleshooting'
    },
    {
      id: 8,
      trade: 'Electrician',
      question: 'A 30mA Residual Current Circuit Breaker (RCCB) immediately trips when a submersible pump is turned on. What does this indicate?',
      options: [
        'High voltage from the grid transformer',
        'An earth leakage current greater than 30mA in the pump winding or submersible cable',
        'The water tank is completely full',
        'The pump motor is rotating too fast'
      ],
      correctIndex: 1,
      explanation: 'RCCBs detect imbalance between phase and neutral currents; a trip signifies current leaking to ground through degraded insulation.',
      category: 'Troubleshooting'
    },
    {
      id: 9,
      trade: 'Electrician',
      question: 'Which personal protective equipment (PPE) must always be worn when troubleshooting a live panel after de-energizing checks?',
      options: [
        'Loose synthetic shirt and metal jewelry',
        '1000V rated insulated safety shoes, safety goggles/face shield, and dry cotton clothing',
        'Bare feet on dry sand',
        'Normal rubber slippers and wet gloves'
      ],
      correctIndex: 1,
      explanation: 'Insulated shoes, eye protection, and natural fiber clothing protect the electrician against potential flashovers and electric shocks.',
      category: 'Safety'
    },
    {
      id: 10,
      trade: 'Electrician',
      question: 'What is the correct wire size (cross-sectional area) recommended for a dedicated 16A power socket carrying heavy inductive loads like air conditioners?',
      options: [
        '0.75 sq mm',
        '1.0 sq mm',
        '2.5 to 4.0 sq mm copper conductor',
        '0.5 sq mm telephone wire'
      ],
      correctIndex: 2,
      explanation: 'Heavy appliances requiring 16A continuous loads mandate at least 2.5 sq mm or 4.0 sq mm copper conductors to prevent overheating.',
      category: 'Practical Scenario'
    }
  ],
  Plumber: [
    {
      id: 1,
      trade: 'Plumber',
      question: 'Before excavating or cutting into a concealed bathroom wall for plumbing repair, what critical action is required?',
      options: [
        'Turn off the main overhead tank valve and scan or verify electrical conduit locations',
        'Immediately hammer into the wall tiles at high speed',
        'Increase water pump pressure to find the leak by water spray',
        'Disconnect the sewer vent on the building roof'
      ],
      correctIndex: 0,
      explanation: 'Shutting off water supply and checking for hidden electrical conduits prevents water damage and accidental electrocution.',
      category: 'Safety'
    },
    {
      id: 2,
      trade: 'Plumber',
      question: 'What is the primary function of a P-trap or S-trap installed beneath a washbasin or kitchen sink?',
      options: [
        'To increase the speed of draining water',
        'To hold a water barrier that stops hazardous sewer gases and foul smells from entering the room',
        'To collect drinking water during shortages',
        'To filter out micro-plastics from the drainage line'
      ],
      correctIndex: 1,
      explanation: 'A liquid seal maintained in the trap prevents methane and noxious sewer gases from venting back into the home.',
      category: 'Basic Knowledge'
    },
    {
      id: 3,
      trade: 'Plumber',
      question: 'When joining CPVC pipes for domestic hot water lines, which solvent cement should be used?',
      options: [
        'Ordinary PVC / drainage solvent cement',
        'Specially formulated CPVC solvent cement rated for high temperatures',
        'Rubber adhesive or super glue',
        'White wood glue'
      ],
      correctIndex: 1,
      explanation: 'CPVC operates under higher temperatures and pressures; using ordinary PVC glue causes joint softening and blowout.',
      category: 'Basic Knowledge'
    },
    {
      id: 4,
      trade: 'Plumber',
      question: 'A client observes a loud thudding or knocking sound in the pipes whenever a quarter-turn tap is closed rapidly. What is this phenomenon called?',
      options: [
        'Water hammer (hydraulic shock)',
        'Electrolytic corrosion',
        'Pipe mineralization',
        'Syphonage failure'
      ],
      correctIndex: 0,
      explanation: 'Water hammer occurs when moving water is stopped abruptly, sending a high-pressure shockwave through rigid piping.',
      category: 'Practical Scenario'
    },
    {
      id: 5,
      trade: 'Plumber',
      question: 'How is water hammer effectively solved or mitigated in a modern residential piping system?',
      options: [
        'By tightening all pipe brackets until the pipe bends',
        'By installing a water hammer arrestor or vertical air chamber near fast-closing fixtures',
        'By removing all non-return valves',
        'By reducing pipe wall thickness'
      ],
      correctIndex: 1,
      explanation: 'Water hammer arrestors contain an air/gas cushion that absorbs the shock wave harmlessly.',
      category: 'Troubleshooting'
    },
    {
      id: 6,
      trade: 'Plumber',
      question: 'What is the purpose of performing a hydrostatic pressure test on newly installed concealed plumbing lines before plastering?',
      options: [
        'To test if hot water flows through the toilet flush',
        'To verify pipe joint tightness and confirm zero leaks under 1.5 times working pressure for a sustained duration',
        'To measure how loud the water sounds inside the wall',
        'To wash paint off the pipe surface'
      ],
      correctIndex: 1,
      explanation: 'Hydrostatic pressure testing ensures concealed joints withstand operating stress without leaking before tiling or plastering.',
      category: 'Practical Scenario'
    },
    {
      id: 7,
      trade: 'Plumber',
      question: 'Which tool is best suited for gripping and turning smooth chrome-plated brass tap fittings without scratching or marring the finish?',
      options: [
        'Heavy serrated steel pipe wrench (Stillson)',
        'Smooth-jaw adjustable spanner or strap wrench with protective cloth',
        'Needle-nose wire cutter',
        'Claw hammer'
      ],
      correctIndex: 1,
      explanation: 'Toothed pipe wrenches damage chrome platings; smooth jaws or strap wrenches apply torque without gouging.',
      category: 'Safety'
    },
    {
      id: 8,
      trade: 'Plumber',
      question: 'In a multi-story building drainage stack, what is the role of the atmospheric vent pipe extending through the roof terrace?',
      options: [
        'To collect rainwater directly into sewage pipes',
        'To equalize pressure in the drainage system and prevent siphoning of fixture trap water seals',
        'To serve as an emergency ladder',
        'To allow birds to nest safely'
      ],
      correctIndex: 1,
      explanation: 'Venting maintains atmospheric pressure inside waste stacks so suction does not pull water out of fixture traps.',
      category: 'Basic Knowledge'
    },
    {
      id: 9,
      trade: 'Plumber',
      question: 'When repairing a persistent dripping faucet with a modern ceramic disc cartridge, what is typically the correct fix?',
      options: [
        'Hammering the spindle tighter',
        'Replacing the worn ceramic disc cartridge or internal O-rings after flushing debris',
        'Pouring kerosene into the tap handle',
        'Cutting the supply copper tube with an angle grinder'
      ],
      correctIndex: 1,
      explanation: 'Ceramic disc taps do not use traditional rubber washers; leaks are rectified by cleaning or replacing the modular cartridge.',
      category: 'Troubleshooting'
    },
    {
      id: 10,
      trade: 'Plumber',
      question: 'What safety precaution should be taken when entering a deep sewage inspection chamber or manhole on a commercial site?',
      options: [
        'Light a matchstick inside the chamber to check for light',
        'Test for toxic gases (H2S, methane), allow natural ventilation, wear a safety harness and have an attendant outside',
        'Close the lid firmly while working inside to avoid dust',
        'Enter immediately without informing anyone'
      ],
      correctIndex: 1,
      explanation: 'Sewage pits contain fatal toxic gases and oxygen deficiency. Gas testing, ventilation, and harness lifelines are mandatory.',
      category: 'Safety'
    }
  ],
  Carpenter: [],
  Mechanic: [],
  Mason: [],
  Welder: [],
  Tailor: [],
  Painter: [],
  Other: []
};

// ==============================================================
// 2. DEMONSTRATION COURSES DATA (Part 7 & 8)
// ==============================================================

export const courseCatalog: CourseItem[] = [
  // --- ELECTRICIAN COURSES ---
  {
    id: 'ele-course-101',
    trade: 'Electrician',
    title: 'Electrical Fundamentals',
    level: 'Foundation',
    levelTag: 'Free • Entry Skill Building',
    demoPrice: 'Free',
    duration: '2 Weeks (12 Modules)',
    skillsCovered: [
      'Ohm’s law & power formulas',
      'Multimeter voltage & continuity testing',
      'Basic electrical safety & first aid',
      'Single-phase AC vs DC circuits',
      'PPE & insulation requirements'
    ],
    eligibility: 'Open to all workers with informal trade experience.',
    assessmentRequirements: 'Complete all 12 modules and submit 1 basic safety check checklist.',
    description: 'A comprehensive starter course clarifying core electrical concepts, essential circuit math, and foundational workshop safety for informal electricians seeking NSQF recognition.',
    modules: [
      { id: 'm1', title: 'Introduction to Voltage, Current, and Resistance', duration: '20 mins', description: 'Understand basic electron flow and circuit loops.', topics: ['Ohm’s law in practical situations', 'Measuring potential difference', 'Using a digital multimeter safely'] },
      { id: 'm2', title: 'Electrical Hazards and Shock Prevention', duration: '25 mins', description: 'Key causes of electrical accidents and how to avoid them.', topics: ['Physiology of electrical shock', 'Ground fault paths', 'Insulated hand tool standards (IEC 60900)'] },
      { id: 'm3', title: 'Basic Wire Sizing and Color Codes', duration: '30 mins', description: 'Indian Standard color codes and conductor ratings.', topics: ['IS 732 wire color standards', 'Conductor gauge and ampacity', 'Terminal crimping vs twisting'] }
    ],
    practicalTask: {
      title: 'Multimeter Inspection and PPE Check',
      description: 'Demonstrate how to inspect an electrical test tool, confirm meter battery health, and test continuity across a de-energized test loop.',
      safetyChecklist: [
        'Insulated multimeter leads have no exposed copper or cuts',
        'Meter selector set to correct AC voltage / continuity range',
        'Safety goggles and insulated footwear worn',
        'Circuit de-energized before continuity test'
      ],
      guidingQuestions: [
        'How did you verify that your test equipment is in safe working condition?',
        'What voltage reading did you obtain across the terminals, and how does it compare to nominal values?'
      ],
      evidenceTypeNeeded: 'Photo or short video showing your meter leads, PPE, and test reading.'
    }
  },
  {
    id: 'ele-course-201',
    trade: 'Electrician',
    title: 'Electrical Installation and Troubleshooting',
    level: 'Intermediate',
    levelTag: 'Intermediate • Practical Diagnostic',
    demoPrice: '₹499',
    duration: '4 Weeks (18 Modules)',
    skillsCovered: [
      'Sub-distribution board assembly',
      'MCB, RCCB, and RCBO selection',
      'Earth pit resistance measurement',
      'Concealed conduit cable pulling',
      'Fault diagnosis of tripping breakers'
    ],
    eligibility: 'Minimum 1 year informal work experience or completion of Electrical Fundamentals.',
    assessmentRequirements: 'Submit practical household inspection evidence with geo-photo and safety rubric.',
    description: 'Practical training on domestic and commercial wiring standards, fault isolation in tripping circuits, and proper installation of residual current devices according to National Electrical Code.',
    modules: [
      { id: 'm1', title: 'Distribution Board Layout and Wiring', duration: '35 mins', description: 'Ferruling, busbar connections, and neat dressing.', topics: ['Phase balancing across 3-phase DB', 'Isolator & RCCB hierarchy', 'Cable glanding and earthing busbars'] },
      { id: 'm2', title: 'Troubleshooting Earth Leaks and Short Circuits', duration: '40 mins', description: 'Systematic diagnosis of intermittent tripping.', topics: ['Megger insulation resistance testing', 'Neutral-to-earth fault isolation', 'Appliance leakage tracing'] },
      { id: 'm3', title: 'Earth Pit Construction and Maintenance', duration: '30 mins', description: 'Chemical and conventional earthing standards.', topics: ['Pipe and plate earthing', 'Bentonite and charcoal backfill', 'Measuring pit resistance under 5 Ohms'] }
    ],
    practicalTask: {
      title: 'Household Installation Safety Inspection',
      description: 'Demonstrate how to inspect a household electrical installation, check distribution board labeling, evaluate grounding, and identify potential hazards.',
      safetyChecklist: [
        'Turned off main supply before removing DB dead-front cover',
        'Verified zero voltage with calibrated tester on all phases',
        'Checked for loose terminal screws and heat discoloration',
        'Verified 30mA RCCB test button trips cleanly'
      ],
      guidingQuestions: [
        'What specific condition did you inspect in the distribution board (e.g. wire sizing, breaker ratings, earthing)?',
        'What potential hazard or defect did you identify, and what corrective action was taken?'
      ],
      evidenceTypeNeeded: 'Photo or video of distribution board with neat wiring, earth wire connected, and test verification.'
    }
  },
  {
    id: 'ele-course-301',
    trade: 'Electrician',
    title: 'Advanced Electrical Systems and Diagnostics',
    level: 'Advanced',
    levelTag: 'Advanced • Industrial & Solar Focus',
    demoPrice: '₹1,499',
    duration: '6 Weeks (24 Modules)',
    skillsCovered: [
      '3-Phase motor controls & Star-Delta starters',
      'Solar PV rooftop inverter synchronization',
      'Surge Protection Devices (SPD) & lightning arrestors',
      'Variable Frequency Drives (VFD) setup',
      'Thermographic heat spot inspection'
    ],
    eligibility: 'Prior electrical experience (3+ years) or Level 4 NSQF qualification pack.',
    assessmentRequirements: 'Practical submission evaluated by certified NCVET Assessor with digital credential endorsement.',
    description: 'Industrial-grade diagnostic methodologies, solar grid-tie inverter commissioning, motor control center troubleshooting, and advanced electrical safety standards.',
    modules: [
      { id: 'm1', title: '3-Phase Induction Motors and Starters', duration: '45 mins', description: 'Control wiring and protection schemes.', topics: ['Contactor interlocking logic', 'Thermal overload relay setting', 'Single phasing preventer wiring'] },
      { id: 'm2', title: 'Solar PV Grid-Tied Inverter Commissioning', duration: '50 mins', description: 'DC string voltages, MPPT, and ACDB protection.', topics: ['MC4 connector crimping and VOC testing', 'Anti-islanding protection tests', 'DC surge arrestors and isolation'] },
      { id: 'm3', title: 'Industrial Power Quality and Harmonics', duration: '40 mins', description: 'Mitigating voltage spikes and power factor penalties.', topics: ['Automatic power factor correction (APFC)', 'Capacitor bank switching', 'Harmonic filter installation'] }
    ],
    practicalTask: {
      title: 'Advanced 3-Phase Control Panel or Solar Inverter Diagnostic',
      description: 'Inspect an industrial motor starter or solar PV junction box. Demonstrate voltage verification, connection tightness, and safety interlock verification.',
      safetyChecklist: [
        'Full Arc-Flash rated face shield and 1000V insulating gloves worn',
        'Lockout/Tagout applied with personal padlock',
        'Verified phase-to-phase and phase-to-neutral voltages',
        'Torqued terminal lugs to manufacturer specification'
      ],
      guidingQuestions: [
        'Explain the sequence of operations you verified during the diagnostic.',
        'How did you confirm that the safety interlocks or anti-islanding mechanisms operated correctly?'
      ],
      evidenceTypeNeeded: 'Photo or video showing control panel interior, multimeter probe placement, and test reading.'
    }
  },

  // --- PLUMBER COURSES ---
  {
    id: 'plumb-course-101',
    trade: 'Plumber',
    title: 'Plumbing Basics and Pipe Fitting',
    level: 'Foundation',
    levelTag: 'Free • Entry Skill Building',
    demoPrice: 'Free',
    duration: '2 Weeks (12 Modules)',
    skillsCovered: [
      'PVC, CPVC, and UPVC pipe selection',
      'Cutting, reaming, and solvent welding',
      'Thread tape and sealants application',
      'Hand tool safety & pipe wrenches',
      'P-trap and water seal maintenance'
    ],
    eligibility: 'Open to all plumbing helpers and informal workers.',
    assessmentRequirements: 'Complete foundation modules and submit 1 pipe joint inspection.',
    description: 'Foundational techniques for solvent welding, leak-free threaded fittings, standard plumbing tools, and basic sanitary installation for residential homes.',
    modules: [
      { id: 'm1', title: 'Plumbing Materials and Pipe Standards', duration: '20 mins', description: 'Understanding differences between PVC, CPVC, PPR, and GI.', topics: ['Pressure ratings and temperature limits', 'Chemical resistance of plastics', 'Proper pipe support spacing'] },
      { id: 'm2', title: 'Cutting, Deburring, and Joint Preparation', duration: '25 mins', description: 'Key steps for leak-free chemical weld.', topics: ['Using ratchet pipe cutters', 'Reaming the internal pipe diameter', 'Solvent primer and cement curing time'] },
      { id: 'm3', title: 'Trap Seals and Drain Clearing', duration: '25 mins', description: 'Maintaining sewer gas barriers.', topics: ['S-trap vs P-trap mechanics', 'Clearing hair and debris traps', 'Vent line alignment'] }
    ],
    practicalTask: {
      title: 'Pipe Joint Preparation and Pressure Inspection',
      description: 'Demonstrate cutting, deburring, solvent welding a CPVC or PVC pipe assembly, and testing the joint for watertight seal.',
      safetyChecklist: [
        'Safety glasses worn while cutting pipe',
        'Adequate ventilation when using solvent cement',
        'Deburred pipe ends to prevent O-ring damage',
        'Allowed 24-hour full cure before high pressure testing'
      ],
      guidingQuestions: [
        'What pipe material was selected and what solvent cement was used?',
        'How did you inspect the completed joint to ensure zero leaks?'
      ],
      evidenceTypeNeeded: 'Photo showing clean cut, even solvent bead, and assembled fitting without misalignment.'
    }
  },
  {
    id: 'plumb-course-201',
    trade: 'Plumber',
    title: 'Advanced Sanitary and Pressure Diagnostics',
    level: 'Intermediate',
    levelTag: 'Intermediate • Practical Diagnostic',
    demoPrice: '₹499',
    duration: '4 Weeks (16 Modules)',
    skillsCovered: [
      'Hydrostatic pressure testing of concealed pipes',
      'Concealed cisterns and wall-hung toilet frames',
      'Pressure booster pumps and bladder tanks',
      'Thermostatic mixer valve servicing',
      'Water hammer mitigation'
    ],
    eligibility: 'Minimum 1 year informal plumbing experience.',
    assessmentRequirements: 'Submit practical leaking connection diagnosis and repair demonstration.',
    description: 'Learn modern concealed sanitary installation, pressure booster system diagnostics, solar hot water line plumbing, and leak detection protocols.',
    modules: [
      { id: 'm1', title: 'Concealed Water Supply Installations', duration: '35 mins', description: 'Tiling depth alignment and wall chases.', topics: ['Pressure testing before wall plaster', 'Brass insert fittings protection', 'Expansion loops in hot water lines'] },
      { id: 'm2', title: 'Booster Pump & Pressure Tank Setup', duration: '40 mins', description: 'Constant water pressure in villas and apartments.', topics: ['Pressure switch cut-in / cut-out settings', 'Pre-charge bladder pressure testing', 'Non-return valve positioning'] },
      { id: 'm3', title: 'Acoustic and Thermal Leak Detection', duration: '30 mins', description: 'Non-invasive leak isolation inside walls.', topics: ['Pressure drop monitoring on test gauge', 'Identifying slab leaks', 'Minimizing tile damage during repairs'] }
    ],
    practicalTask: {
      title: 'Diagnose and Repair Leaking Connection Safely',
      description: 'Inspect a simulated leaking pipe connection, explain how the issue is diagnosed, shut off supply safely, and replace the defective fitting or seal.',
      safetyChecklist: [
        'Main water supply valve isolated before disassembly',
        'Drained standing water into bucket to avoid floor damage',
        'Inspected pipe threads for hairline stress fractures',
        'Applied PTFE tape clockwise and torqued without overtightening'
      ],
      guidingQuestions: [
        'What was the cause of the leak (e.g. degraded washer, cracked fitting, overtightened thread)?',
        'What repair steps and safety precautions did you take?'
      ],
      evidenceTypeNeeded: 'Photo or short video showing the disassembled leaking part and the newly replaced, dry connection.'
    }
  },
  {
    id: 'plumb-course-301',
    trade: 'Plumber',
    title: 'Commercial Hydraulic Systems & Maintenance',
    level: 'Advanced',
    levelTag: 'Advanced • Commercial & High-Rise',
    demoPrice: '₹1,499',
    duration: '6 Weeks (20 Modules)',
    skillsCovered: [
      'Multi-story building riser balancing',
      'Commercial grease interceptor plumbing',
      'Fire sprinkler piping & deluge valves',
      'Rainwater harvesting & greywater filtration',
      'Pumping station telemetry and automation'
    ],
    eligibility: 'Prior plumbing experience (3+ years) or Level 4 NSQF qualification.',
    assessmentRequirements: 'Assessor-graded commercial hydraulic task with certified verification.',
    description: 'Advanced hydraulics for hotels, hospitals, and commercial high-rises. Sizing vertical stacks, hydro-pneumatic pumping stations, and fire safety codes.',
    modules: [
      { id: 'm1', title: 'High-Rise Riser Design & Pressure Reduction', duration: '45 mins', description: 'Managing extreme gravity head pressure.', topics: ['Pressure Reducing Valves (PRV) in series', 'Zoned water supply loops', 'Expansion joints and acoustic dampening'] },
      { id: 'm2', title: 'Commercial Drainage and Sewage Lifting', duration: '40 mins', description: 'Basement sump pits and macerator pumps.', topics: ['Dual submersible sewage pump duplex systems', 'Float switch automation', 'Backflow prevention valves'] },
      { id: 'm3', title: 'Hospital and Commercial Sanitation Codes', duration: '35 mins', description: 'Preventing cross-contamination and back-siphonage.', topics: ['Reduced Pressure Zone (RPZ) backflow preventers', 'Legionella thermal sanitization loops', 'Medical gas pipe color codes'] }
    ],
    practicalTask: {
      title: 'Pressure Reducing Valve (PRV) or Booster Station Inspection',
      description: 'Demonstrate how to inspect an automatic pressure regulating valve or multi-pump booster skid, read inlet/outlet gauges, and verify system balance.',
      safetyChecklist: [
        'Personal safety boots and eye protection worn',
        'Bypassed line or isolated section before cleaning strainer',
        'Monitored pressure relief valve discharge path',
        'Verified system pressure did not exceed piping rated PSI'
      ],
      guidingQuestions: [
        'What were the inlet and outlet pressure readings on the system?',
        'How did you confirm the backflow prevention and pressure relief operated properly?'
      ],
      evidenceTypeNeeded: 'Photo or video showing pressure gauges, PRV body, and strainer inspection.'
    }
  }
];
