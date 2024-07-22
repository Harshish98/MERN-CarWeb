import React, { useContext, useEffect, useState } from "react";
import { CarContext } from "../../context/CarProvider";
import { CarCard } from "../../components/CarCard";
import axios from "axios";
import { UserCard } from "../../components/UserCard";
import AddCar from "../../components/AddCar";

export const Admin = () => {
  const { fetchCars, cars, setCars } = useContext(CarContext);
  const [state, setState] = useState({
    showCarSection: true,
    showUserSection: false,
    showContactSection: false,
    showAddCar: false,
    editingCar: null,
  });
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "https://mern-carweb-server.onrender.com/all-users"
      );
      setUsers(response.data);
    } catch (error) {
      console.error("There was an error fetching the users!", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "https://mern-carweb-server.onrender.com/get-messages"
      );
      setMessages(response.data);
    } catch (error) {
      console.error("There was an error fetching the messages!", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://mern-carweb-server.onrender.com/delete-car/${id}`
      );
      setCars(cars.filter((item) => item._id !== id));
      fetchCars();
    } catch (error) {
      console.error("There was an error deleting the car!", error);
    }
  };

  const handleEdit = (car) => {
    setState({
      showCarSection: false,
      showUserSection: false,
      showContactSection: false,
      showAddCar: true,
      editingCar: car,
    });
  };

  useEffect(() => {
    fetchUsers();
    fetchCars();
    fetchMessages();
  }, []);

  const setActiveSection = (section) => {
    setState((prevState) => ({
      ...prevState,
      showCarSection: section === "car",
      showUserSection: section === "user",
      showContactSection: section === "contact",
      showAddCar: section === "addCar",
      editingCar: section === "addCar" ? prevState.editingCar : null,
    }));
  };

  return (
    <div className="flex py-20 gap-4">
      <div className="bg-primary basis-1/5 h-screen p-2 space-y-4">
        <button
          onClick={() => setActiveSection("car")}
          className={`p-2 cursor-pointer w-3/5 mx-auto block ${
            state.showCarSection && "border-b border-blue-1"
          }  hover:border-b hover:border-blue-1`}
        >
          Cars
        </button>
        <button
          onClick={() => setActiveSection("user")}
          className={`p-2 cursor-pointer w-3/5 mx-auto block ${
            state.showUserSection && "border-b border-blue-1"
          }  hover:border-b hover:border-blue-1`}
        >
          Users
        </button>
        <button
          onClick={() => setActiveSection("contact")}
          className={`p-2 cursor-pointer w-3/5 mx-auto block ${
            state.showContactSection && "border-b border-blue-1"
          }  hover:border-b hover:border-blue-1`}
        >
          User Messages
        </button>
        <button
          onClick={() => setActiveSection("addCar")}
          className={`p-2 cursor-pointer w-3/5 mx-auto block ${
            state.showAddCar && "border-b border-blue-1"
          }  hover:border-b hover:border-blue-1`}
        >
          Add Cars
        </button>
      </div>
      <div className="basis-4/5">
        {state.showCarSection && (
          <div className="grid gap-9 grid-cols-3">
            {cars?.map((car, index) => (
              <CarCard
                car={car}
                key={index}
                showEditButtons={true}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        )}
        {state.showUserSection && (
          <div className="flex gap-4">
            {users?.map((user, index) => (
              <UserCard user={user} key={index} />
            ))}
          </div>
        )}
        {state.showContactSection && (
          <div>
            {messages?.map((msg, index) => (
              <div key={index} className="border w-fit p-2 mb-2">
                <p>
                  <strong>Name:</strong> {msg.name}
                </p>
                <p>
                  <strong>Email:</strong> {msg.email}
                </p>
                <p>
                  <strong>Phone:</strong> {msg.phone}
                </p>
                <p>
                  <strong>Subject:</strong> {msg.subject}
                </p>
                <p>
                  <strong>Message:</strong> {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
        {state.showAddCar && (
          <AddCar
            car={state.editingCar}
            setEditingCar={(car) => setState({ ...state, editingCar: car })}
          />
        )}
      </div>
    </div>
  );
};
