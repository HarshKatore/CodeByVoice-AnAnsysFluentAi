export interface CommandTemplate {
  id: string;
  patterns: string[];
  code: string;
  description: string;
}

export const commandTemplates: CommandTemplate[] = [
  {
    id: "enable_energy",
    patterns: [
      "enable energy",
      "turn on energy",
      "enable energy equation",
      "activate energy model",
    ],
    code: `setup.models.energy.enabled = True`,
    description: "Enables the energy equation in the model",
  },
  {
    id: "disable_energy",
    patterns: ["disable energy", "turn off energy", "disable energy equation"],
    code: `setup.models.energy.enabled = False`,
    description: "Disables the energy equation in the model",
  },
  {
    id: "k_epsilon_turbulence",
    patterns: [
      "k epsilon",
      "k-epsilon",
      "change turbulence model to k epsilon",
      "set turbulence model to k epsilon",
      "use k epsilon model",
    ],
    code: `setup.models.viscous.model = "ke"
setup.models.viscous.ke.model = "standard"`,
    description: "Sets the turbulence model to standard k-epsilon",
  },
  {
    id: "k_omega_turbulence",
    patterns: [
      "k omega",
      "k-omega",
      "change turbulence model to k omega",
      "set turbulence model to k omega",
    ],
    code: `setup.models.viscous.model = "kw"
setup.models.viscous.kw.model = "standard"`,
    description: "Sets the turbulence model to standard k-omega",
  },
  {
    id: "set_operating_pressure",
    patterns: [
      "operating pressure",
      "set operating pressure",
      "change operating pressure",
    ],
    code: `setup.operating_conditions.operating_pressure = 101325.0`,
    description: "Sets the operating pressure to standard atmospheric pressure",
  },
  {
    id: "enable_species_transport",
    patterns: [
      "species transport",
      "enable species",
      "enable species transport",
      "activate species model",
    ],
    code: `setup.models.species.enabled = True
setup.models.species.model = "species-transport"`,
    description: "Enables the species transport model",
  },
  {
    id: "initialize_solution",
    patterns: [
      "initialize",
      "initialize solution",
      "initialization",
      "hybrid initialization",
    ],
    code: `solution.initialization.hybrid_initialize()`,
    description: "Initializes the solution using hybrid initialization",
  },
  {
    id: "run_calculation",
    patterns: [
      "run calculation",
      "start calculation",
      "iterate",
      "run iterations",
      "calculate",
    ],
    code: `solution.calculation.iterate(number_of_iterations=100)`,
    description: "Runs the calculation for 100 iterations",
  },
  {
    id: "set_velocity_inlet",
    patterns: ["set inlet velocity", "change inlet velocity", "velocity inlet"],
    code: `setup.boundary_conditions["velocity-inlet"]["inlet"].velocity_magnitude = 10.0`,
    description: "Sets the velocity magnitude at an inlet boundary",
  },
  {
    id: "set_mass_flow_inlet",
    patterns: ["set mass flow", "change mass flow", "mass flow inlet"],
    code: `setup.boundary_conditions["mass-flow-inlet"]["inlet"].mass_flow = 0.1`,
    description: "Sets the mass flow rate at an inlet boundary",
  },
];

export const getCodeTemplate = (command: string): string => {
  return command;
};
