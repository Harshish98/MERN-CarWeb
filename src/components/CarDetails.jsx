import React, { useContext, useEffect } from "react";
import CarCarousel from "./CarCarousel";
import { CarContext } from "../context/CarProvider";
import { useParams } from "react-router-dom";
import { ContactForm } from "./ContactForm";
import { SignInIcon } from "../icons/navbar-icons/SignInIcon";

export const CarDetails = () => {
  const { fetchSpecificCar, specificCar } = useContext(CarContext);
  const { id } = useParams();

  useEffect(() => {
    console.log("specificCar:", specificCar);
    fetchSpecificCar(id);
  }, [id]);

  const imageBaseUrl = "https://mern-carweb-server.onrender.com/images/";
  return (
    <>
      <div className="pt-14 pb-10">
        <div className="mb-20">
          {specificCar.images && specificCar.images.length > 0 ? (
            <CarCarousel
              images={specificCar.images.map(
                (image) => `${imageBaseUrl}${image}`
              )}
              video={specificCar.video}
            />
          ) : (
            <p>No images available</p>
          )}
        </div>
        <div className="flex gap-28 w-max mx-auto mb-16">
          <div className="w-[664px] space-y-16">
            <div>
              <h2 className="text-lg mb-6 font-bold">Description</h2>
              <p>{specificCar.description}</p>
            </div>
            <div>
              <h2 className="text-lg mb-6 font-bold">Feature</h2>
              <div className="flex gap-3 flex-wrap">
                {specificCar &&
                  specificCar.features?.map((feature, index) => (
                    <p className="bg-blue-2 w-fit p-4 rounded text-lg flex items-center gap-1 capitalize">
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_345_219)">
                          <path
                            d="M17.4167 2.75H4.58333C3.56583 2.75 2.75 3.575 2.75 4.58333V17.4167C2.75 18.425 3.56583 19.25 4.58333 19.25H17.4167C18.4342 19.25 19.25 18.425 19.25 17.4167V4.58333C19.25 3.575 18.4342 2.75 17.4167 2.75ZM9.16667 15.5833L4.58333 11L5.87583 9.7075L9.16667 12.9892L16.1242 6.03167L17.4167 7.33333L9.16667 15.5833Z"
                            fill="white"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_345_219">
                            <rect width="22" height="22" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      {feature}
                    </p>
                  ))}
              </div>
            </div>
            <div>
              <h2 className="text-lg mb-6 font-bold">Dealer Info</h2>
              <div className="h-[88px] bg-primary flex justify-between text-lg p-4">
                <div className="flex items-center border-r basis-1/3">
                  <SignInIcon width={45} height={45} />
                  <p>Dealer Name</p>
                </div>
                <div className="flex gap-1 items-center border-r basis-1/3 pl-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p>000-000-0000</p>
                </div>
                <div className="flex gap-1 items-center pl-4 basis-1/3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-6"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                  </svg>
                  <p>dealer@gmail.com</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-lg mb-6 font-bold">Contact</h2>
              <ContactForm car={specificCar.carName} />
            </div>
            <div>
              <h2 className="text-lg mb-6 font-bold">Location</h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.2964633622355!2d72.9958718748724!3d26.25203998817136!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418dbbfd1e97f1%3A0x636a2913850b2be7!2sOILAB%20LEARNING%20INSTITUTE!5e0!3m2!1sen!2sin!4v1720465626445!5m2!1sen!2sin"
                width="664"
                height="323"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          <div className="w-[395px] space-y-16">
            <div className="text-center text-blue-1 border border-blue-1 py-4 text-lg font-bold">
              ${specificCar.price}
            </div>
            <div className="bg-primary p-6 space-y-12">
              <div>
                <h2 className="text-lg mb-3">Car Details</h2>
                <div className="border-b pb-4 capitalize">
                  <p className="inline-block w-3/5 text-[#A9A9A9]">Brand</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.brand}
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">Model</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.model}
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">Condition</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.condition}
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">Year</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.year}
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">Body Type</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.bodyType}
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">Seats</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.seats} People
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">
                    Exterior Color
                  </p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.exteriorColor}
                  </p>
                  {specificCar.fuelType === "Electric" ? null : (
                    <>
                      <p className="inline-block w-3/5 text-[#A9A9A9]">
                        Tank Capacity
                      </p>
                      <p className="inline-block w-2/5 text-right">
                        {specificCar.tankCapacity} L
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <h2 className="text-lg mb-3">Engine</h2>
                <div className="border-b pb-4 capitalize">
                  <p className="inline-block w-3/5 text-[#A9A9A9]">fuel type</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.fuelType}
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">Mileage</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.mileage} km
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">
                    transmission
                  </p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.transmission}
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">
                    drive train
                  </p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.driveTrain}
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">power</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.power} hp
                  </p>
                </div>
              </div>
              {specificCar.fuelType === "Electric" ? (
                <div>
                  <h2 className="text-lg mb-3">Battery and Charging</h2>
                  <div className="border-b pb-4">
                    <p className="inline-block w-3/5 text-[#A9A9A9]">
                      Battery Capacity
                    </p>
                    <p className="inline-block w-2/5 text-right">
                      {specificCar.batteryCapacity} kWh
                    </p>
                    <p className="inline-block w-3/5 text-[#A9A9A9]">
                      Charge Speed
                    </p>
                    <p className="inline-block w-2/5 text-right">
                      {specificCar.chargeSpeed} km/h
                    </p>
                    <p className="inline-block w-3/5 text-[#A9A9A9]">
                      Charge Port
                    </p>
                    <p className="inline-block w-2/5 text-right">
                      Type {specificCar.chargePort}
                    </p>
                    <p className="inline-block w-3/5 text-[#A9A9A9]">
                      Charge Time
                    </p>
                    <p className="inline-block w-2/5 text-right">
                      {specificCar.chargingTime} mnt
                    </p>
                  </div>
                </div>
              ) : null}
              <div>
                <h2 className="text-lg mb-3">Dimension</h2>
                <div className="border-b pb-4">
                  <p className="inline-block w-3/5 text-[#A9A9A9]">Length</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.length} mm
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">Width</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.width} mm
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">Height</p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.height} mm
                  </p>
                  <p className="inline-block w-3/5 text-[#A9A9A9]">
                    Cargo Volume
                  </p>
                  <p className="inline-block w-2/5 text-right">
                    {specificCar.cargoVolume} L
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-3/4 mx-auto">
          <h2 className="text-lg mb-6 font-bold">Credit Simulation</h2>
          <div className="p-6 flex gap-7">
            <div className="text-lg">
              <div className="flex justify-between gap-6">
                <div>
                  <label>Price</label>
                  <input
                    className="py-3 px-4 text-lg bg-blue-2 rounded block w-[216px]"
                    value={`$ ${specificCar.price}`}
                  />
                </div>
                <div>
                  <label>Interest Rate</label>
                  <input
                    className="py-3 px-4 text-lg bg-blue-2 rounded block w-[216px]"
                    value={"12%"}
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label>Period in Months</label>
                  <select className="py-3 px-4 text-lg bg-blue-2 rounded block w-[216px]">
                    <option>12 Months</option>
                    <option>24 Months</option>
                  </select>
                </div>
                <div>
                  <label>Down Payment</label>
                  <input
                    className="py-3 px-4 text-lg bg-blue-2 rounded block w-[216px]"
                    value={""}
                  />
                </div>
              </div>
            </div>
            <div className="text-lg w-[664px] bg-blue-2 border border-blue-1 py-9">
              <p className="border-b-2 border-[#004A77] mb-0.5 py-1 w-fit mx-auto">
                Monthly Payment
              </p>
              <p className="text-blue-1 font-bold w-fit mx-auto py-1 px-2 border-t-2 border-[#004A77]">
                $2878
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
