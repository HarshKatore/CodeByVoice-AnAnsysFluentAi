# Fluenta - An Ansys Fluent Voice Assistant

Welcome to the Fluenta repository! This project is a voice assistant for Ansys Fluent, designed to enhance user experience by enabling voice command interaction with the Fluent CFD software. Fluenta aims to streamline workflow and increase productivity for Fluent users.

## Overview

Fluenta integrates natural language processing with Ansys Fluent to allow users to perform common simulation tasks, query results, and navigate the interface using voice commands. This voice-first approach makes complex CFD simulations more accessible and efficient.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Python** (version 3.8 or higher)
- **Ansys Fluent** (2023 R1 or later)
- **Git**
- **pip** (Python package manager)
- **Microphone and speakers** for voice interaction

## Getting Started

Follow these steps to set up and run Fluenta on your local machine:

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/HarshKatore/Fluenta-AnAnsysFluentVoiceAssistant.git
cd Fluenta-AnAnsysFluentVoiceAssistant
```

### 2. Create and Activate a Virtual Environment

It's recommended to use a virtual environment:

```bash
python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate
```

### 3. Install Dependencies

Install all the required dependencies:

```bash
pip install -r requirements.txt
```

### 4. Configure Ansys Fluent Integration

Set up the connection to your Ansys Fluent installation:

```bash
python setup_fluent.py
```

Follow the on-screen instructions to locate your Fluent installation directory.

### 5. Run Fluenta

Start the Fluenta voice assistant:

```bash
python run_fluenta.py
```

### 6. Voice Command Testing

After starting Fluenta, you can test it with voice commands like:
- "Create a new simulation"
- "Set inlet velocity to 5 meters per second"
- "Run the simulation for 100 iterations"
- "Show me the pressure contours"

## Project Structure

The repository is organized as follows:
- `src/` - Contains the core code for the Fluenta voice assistant
- `models/` - Includes voice recognition and natural language processing models
- `fluent_integration/` - Code for Ansys Fluent integration
- `utils/` - Utility functions and helper modules
- `config/` - Configuration files for customizing Fluenta
- `tests/` - Test files for the project

## Features

- **Voice Command Recognition**: Understand and process spoken instructions
- **Natural Language Understanding**: Translate natural language to Fluent commands
- **Command Execution**: Interface with Fluent to execute commands
- **Context Awareness**: Maintain context across multiple commands
- **Query Capabilities**: Retrieve and present simulation results verbally
- **Custom Command Creation**: Define personal shortcuts for frequent operations

## Troubleshooting

- **Voice Recognition Issues**: Ensure you're in a quiet environment and your microphone is properly configured
- **Fluent Connection Errors**: Verify your Ansys Fluent installation path in the configuration
- **Command Not Recognized**: Try rephrasing your command using simpler terms
- **Performance Issues**: Close unnecessary applications to free up system resources

## Contributing

We welcome contributions to Fluenta! If you'd like to contribute, please follow these steps:
1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Submit a pull request with a detailed description of your changes

Please ensure your code follows our coding standards and includes appropriate tests.

## Future Development

- Integration with Ansys Cloud for remote simulation management
- Support for additional CAE software beyond Fluent
- Mobile application for remote monitoring
- Multi-language support
- Advanced visualization capabilities

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for details.

## Contact

For any questions or feedback, feel free to reach out to Harsh Katore at **harshkatore@16gmail.com**.

## Acknowledgments

- Ansys, Inc. for providing the Fluent software platform
- The open-source speech recognition community
- All contributors who have helped improve Fluenta
