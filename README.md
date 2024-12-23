# Dynamic Event Calendar Application

## **Deployment**
The application is deployed on **Netlify**. You can access it using the following link:

[Deployed Application](https://event-calendar-ojas-bhosale.netlify.app/)

## **Overview**
The Dynamic Event Calendar Application is a modern, feature-rich calendar app built using **React.js** and styled with **shadcn** components. It allows users to efficiently manage events with an intuitive interface and advanced functionalities, such as event persistence, filtering, and seamless calendar navigation.

---

## **Features**

### **Core Features**
1. **Calendar View**:
   - Displays a dynamic calendar grid for the current month.
   - Allows navigation between months using "Previous" and "Next" buttons.
   - Highlights the current day and selected day for clarity.

2. **Event Management**:
   - Add, edit, or delete events for any day.
   - Each event includes:
     - Event name
     - Start time and end time
     - Optional description
   - Prevents overlapping events (conflicting times are disallowed).

3. **Event List**:
   - Displays a list of all events for the selected day in a modal.
   - Allows users to filter events by keyword.

4. **Data Persistence**:
   - Uses **localStorage** to save events, ensuring data is retained across page refreshes.

---

## **Technologies Used**
- **React.js**: For building the dynamic user interface.
- **shadcn**: For clean and modern UI components.
- **LocalStorage**: For data persistence.
- **Netlify**: For deployment.

---

## **Instructions to Run the Application Locally**

### Prerequisites
- **Node.js** (version 14 or later)
- **npm** or **yarn** (for package management)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/ojasbhosale/event-calendar-react.git
   cd event-calendar-react

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   
4. Open the application in your browser at:
   ```bash
   http://localhost:3000

---
   

## **Key Highlights**

   - Advanced Calendar Logic: Handles month transitions and leap years seamlessly.
   - Responsive UI: Optimized for both desktop and mobile devices.
   - Code Quality: Modular, clean, and maintainable code with comments for non-trivial logic.

---

## **Future Enhancements**
   - Integration with a backend to support multi-user event management.
   - Addition of recurring event functionality.
   - Improved UI animations for drag-and-drop features.

---
   
## **Author**
   - Name: Ojas Bhosale
   - GitHub: ojasbhosale
   - LinkedIn: ojas-bhosale

