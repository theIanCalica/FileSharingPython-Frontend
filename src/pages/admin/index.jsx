import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Widget from "../../components/Admin/Widget";
import BarChart from "../../components/Admin/Chart/BarChart";
import LineChart from "../../components/Admin/Chart/LineChart";
import PieChart from "../../components/Admin/Chart/PieChart";
import Map from "../../components/Admin/Map";
import { notifySuccess, notifyError, getUser } from "../../utils/Helpers";
import client from "../../utils/client";

const Home = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const user = getUser();
  const [userCount, setUserCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [fileCount, setFileCount] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);

  const getNumberofUsers = async () => {
    try {
      const response = await client.get(`/user-count/`, {
        withCredentials: true,
      });
      setUserCount(response.data.user_count);
    } catch (err) {
      console.error("Error fetching user count:", err);
    }
  };

  const getNumberOfContact = async () => {
    try {
      await client
        .get(`/contact-count/`, {
          withCredentials: true,
        })
        .then((response) => {
          setContactCount(response.data.contact_count);
        })
        .catch((err) => {
          notifyError("Error fetching number of contacts");
          console.error("Error fetching number of contacts:", err);
        });
    } catch (err) {
      notifyError("Error fetching number of contacts");
      console.error("Error fetching number of contacts:", err);
    }
  };

  const getNumberOfFiles = async () => {
    try {
      await client
        .get("/files-count/", {
          withCredentials: true,
        })
        .then((response) => {
          setFileCount(response.data.file_count);
        });
    } catch (err) {
      notifyError("Error fetching number of files");
      console.error("Error fetching number of files:", err);
    }
  };

  useEffect(() => {
    getNumberofUsers();
    getNumberOfContact();
    getNumberOfFiles();

    if (loggedIn && user && user.is_superuser === true) {
      notifySuccess("Successfully logged in");
    }
  }, [loggedIn]);

  return (
    <div className="dashboard">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {showWelcome && (
        <div className="mt-5 bg-green-100 border border-green-200 text-green-800 p-4 shadow-md rounded-lg relative">
          <button
            className="absolute top-2 right-2 text-green-800 hover:text-green-900"
            onClick={() => setShowWelcome(false)}
          >
            &times;
          </button>
          <h2 className="text-xl font-semibold">
            Welcome, {user ? user.first_name + " " + user.last_name : "User"}!
          </h2>
          <p className="mt-2">
            We are glad to have you on board. This is your admin dashboard where
            you can manage all aspects of the application.
          </p>
        </div>
      )}

      <div className="flex mt-5 justify-between items-center">
        <Widget type="User" count={userCount} />
        <Widget type="Contact" count={contactCount} />
        <Widget type="File" count={fileCount} />
      </div>

      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg">
        <BarChart />

        <div className="flex justify-between items-center mt-4">
          <div className="text-blue-500 cursor-pointer hover:underline">
            View More
          </div>
          <button className="bg-transparent border border-green-500 text-green-500 px-4 py-2 rounded hover:bg-green-500 hover:text-white transition-colors duration-300">
            Download Report
          </button>
        </div>
      </div>

      {/* Container for BarChart, LineChart, and PieChart */}
      <div className="flex flex-wrap container mt-5 gap-5   rounded-lg w-full ">
        <div className="flex-grow basis-1/3 min-w-[300px] p-4 bg-white shadow rounded-lg">
          <Map />
        </div>
        <div className="flex-grow basis-1/3 min-w-[300px] justify-center items-center p-4 bg-white shadow rounded-lg">
          <PieChart />
        </div>
      </div>

      <div className="container mt-5 bg-white p-4 shadow-md rounded-lg">
        <LineChart />
      </div>
    </div>
  );
};

export default Home;
