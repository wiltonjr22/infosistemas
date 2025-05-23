# infosistemas

This repository contains a modular system for vehicle CRUD processing, split into two main components:

- **Broker**: Responsible for handling incoming requests related to vehicle data retrieval. It acts as the entry point for the system, performing search and read operations directly from the database.
- **Dispatcher**: Dedicated to processing data changes, such as creating new vehicle records or updating existing ones. All insert and update operations are managed by the dispatcher, ensuring business rules and validations are applied before persisting changes.

This architecture separates read and write responsibilities, improving scalability, maintainability, and clarity in the codebase.

Within each main folder, you will find a `fluxo.drawio` file, which provides a flowchart diagram of the respective process.

For example:

![Process Flow Example](image.png)