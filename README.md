# **Webify Client: Frontend Dashboard for Webify Platform**

**Webify Client** is the frontend dashboard designed to work in conjunction with the **Webify Admin** platform. It allows users (clients) to manage their websites, track memberships, and interact with services provided by **Webify**. The client dashboard is integrated with **Clerk Authentication**, ensuring secure login and seamless interaction with the platform.  

While the project is mostly complete, it is still a work in progress, with more features to be added when needed.

---

## **Key Features**  

- **Client Dashboard**: View and manage websites built using the Webify platform.  
- **Membership Management**: Check the status of active memberships and update user details.  
- **Website Management**: A user-friendly interface to view and manage the websites that have been created.  
- **Clerk Authentication**: Secure user authentication using Clerk, providing easy and safe login/signup methods.  
- **Real-Time Data**: Integration with the backend for fetching dynamic content related to client websites and memberships.

---

## **Technologies Used**  

- **Frontend**: React.js, Tailwind CSS  
- **Authentication**: Clerk for user authentication  
- **State Management**: React Context API  
- **Backend Integration**: Firebase for data management (shared between Admin and Client dashboards)  

---

## **Project Setup**  

1. Clone the repository:
   ```bash
   git clone https://github.com/Ibrahimkazi18/Webify-Client.git
   cd Webify-Client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Clerk authentication:
   - Sign up on [Clerk.dev](https://clerk.dev) and create an application.
   - Add your **Clerk API keys** to the `.env` file:
   ```env
   NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-frontend-api
   NEXT_PUBLIC_CLERK_API_KEY=your-clerk-api-key
   NEXT_PUBLIC_CLERK_API_VERSION=your-clerk-api-version
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Screenshots**

![image](https://github.com/user-attachments/assets/a692c055-ad97-48ba-bdc8-ce4bd7fa1b50)
![image](https://github.com/user-attachments/assets/3cabe65c-aec0-4e91-aec0-c97d88e4bd94)
![image](https://github.com/user-attachments/assets/bc5f5ecd-49b6-43d6-9682-930e10e556fe)
![image](https://github.com/user-attachments/assets/3365d227-4e79-432b-895e-6b67f6873b23)
![image](https://github.com/user-attachments/assets/72d0c6dd-94b2-4d56-b63e-8bbfb08c483f)
![image](https://github.com/user-attachments/assets/34049c48-9909-4c97-9ef1-e63a222b3a0b)
![image](https://github.com/user-attachments/assets/eccb04cf-f450-4e2d-a125-993208a8f3eb)


---

## **Next Steps and Future Improvements**  

- **Enhance User Interface**: Future improvements include enhancing the user experience with more detailed data visualizations and smoother interactions.  
- **Website Customization Features**: Adding tools for clients to customize their websites directly from the client dashboard.  
- **Membership Upgrades**: Allow clients to upgrade or modify their memberships based on their needs.  
- **Additional Integrations**: Plan to integrate with other services and tools to enhance the platform's functionality.

---

## **Contact**  

For inquiries or collaboration opportunities, feel free to contact:  
- **Email**: ibirfkazi@gmail.com  
- **GitHub**: [Ibrahimkazi18](https://github.com/Ibrahimkazi18)  

---

## **License**  

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---
