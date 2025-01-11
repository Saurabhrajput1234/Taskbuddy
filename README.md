# TaskBuddy

TaskBuddy is a task management tool designed to help users create, organize, and manage their tasks efficiently. It provides a simple and intuitive interface for adding, categorizing, and tracking tasks with additional support for file attachments.

## Live Demo
Experience TaskBuddy live:
[TaskBuddy on Vercel](https://taskbuddy-nine.vercel.app/)

## Features
- **Task Creation**: Easily add tasks with a title, description, due date, and category.
- **Categorization**: Organize tasks into "Work" or "Personal" categories.
- **Status Updates**: Track progress with statuses like Pending, In Progress, and Completed.
- **File Attachments**: Upload and associate image files with tasks using Cloudinary.
- **Responsive UI**: Optimized for both desktop and mobile devices.

## Screenshots
![Login page](./src/assets/Screenshot%202025-01-11%20163115.png) 
![Firebase authentication](./src/assets/Screenshot%202025-01-11%20163238.png) 
![Home page](./src/assets/Screenshot%202025-01-11%20163910.png) 
![Add task](./src/assets/Screenshot%202025-01-11%20163726.png) 
![Edit Task](./src/assets/Screenshot%202025-01-11%20163859.png) 
![Drag and Drop](./src/assets/Screenshot%202025-01-11%20163933.png) 
![Drag and Drop](./src/assets/Screenshot%202025-01-11%20163820.png) 

## Tech Stack
- **Frontend**: React, Vite
- **State Management**: Redux
- **File Uploads**: Cloudinary
- **Styling**: CSS Modules
- **Deployment**: Vercel

## Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn

### Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/Saurabhrajput1234/Taskbuddy.git
   cd Taskbuddy
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload
   VITE_UPLOAD_PRESET=<your-upload-preset>
   ```
   Replace `<your-cloud-name>` and `<your-upload-preset>` with your Cloudinary configuration.

### Running the Application
Start the development server:
```bash
npm run dev
# or
yarn dev
```
Visit the app at `http://localhost:5173`.

### Building for Production
To create a production-ready build:
```bash
npm run build
# or
yarn build
```
The production files will be in the `dist` folder.

## Deployment
TaskBuddy is deployed using Vercel. To deploy your own version:
1. Push your code to a GitHub repository.
2. Connect the repository to Vercel.
3. Add the necessary environment variables in the Vercel dashboard.
4. Deploy the app with one click.

## Contributing
We welcome contributions! Here's how you can contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Describe your changes"
   ```
4. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
Have questions or feedback? Reach out:
- **Author**: Saurabh
- **Email**: [saurabh639544@example.com]
- **GitHub**: [Saurabhrajput1234](https://github.com/Saurabhrajput1234)

