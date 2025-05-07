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
    code: `# Enable the energy equation
setup.models.energy.enabled = True`,
    description: "Enables the energy equation in the model",
  },
  {
    id: "disable_energy",
    patterns: ["disable energy", "turn off energy", "disable energy equation"],
    code: `# Disable the energy equation
setup.models.energy.enabled = False`,
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
    code: `# Set turbulence model to k-epsilon
setup.models.viscous.model = "k-epsilon"
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
    code: `# Set turbulence model to k-omega
setup.models.viscous.model = "k-omega"
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
    code: `# Set operating pressure to 101325 Pa (atmospheric)
setup.boundary_conditions.operating.pressure = 101325.0`,
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
    code: `# Enable species transport model
setup.models.species.enabled = True
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
    code: `# Initialize the solution using hybrid initialization
solution.initialization.hybrid_initialize()`,
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
    code: `# Run calculation for 100 iterations
solution.run_calculation.iterate(number_of_iterations=100)`,
    description: "Runs the calculation for 100 iterations",
  },
  {
    id: "set_velocity_inlet",
    patterns: ["set inlet velocity", "change inlet velocity", "velocity inlet"],
    code: `# Set velocity inlet boundary condition
# Replace 'inlet' with your actual inlet boundary name if different
setup.boundary_conditions.velocity_inlet['inlet'].velocity.magnitude = 10.0  # m/s`,
    description: "Sets the velocity magnitude at an inlet boundary",
  },
  {
    id: "set_mass_flow_inlet",
    patterns: ["set mass flow", "change mass flow", "mass flow inlet"],
    code: `# Set mass flow inlet boundary condition
# Replace 'inlet' with your actual inlet boundary name if different
setup.boundary_conditions.mass_flow_inlet['inlet'].mass_flow = 0.1  # kg/s`,
    description: "Sets the mass flow rate at an inlet boundary",
  },
];

export const getCodeTemplate = (command: string): string => {
  return `import pyfluent as pf\n\n${command}\n`;
};
