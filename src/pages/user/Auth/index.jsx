import React from "react";

const Index = () => {
  return (
    <div className="font-sans p-4 sm:p-8 flex flex-col items-center">
      {/* Dropdown Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-8 sm:mt-16 mb-6 sm:mb-10 w-full sm:w-auto justify-center">
        {/* Dropdown Button - Type */}
        <div className="relative group">
          <button className="w-full sm:w-36 p-3 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            Type ▼
          </button>
          <div className="absolute hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-md mt-1 w-full">
            {["DOCX", "PDF", "PNG", "JPG", "XLS", "PPTX"].map((type) => (
              <a
                key={type}
                href="#"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {type}
              </a>
            ))}
          </div>
        </div>

        {/* Dropdown Button - People */}
        <div className="relative group">
          <button className="w-full sm:w-36 p-3 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            People ▼
          </button>
          <div className="absolute hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-md mt-1 w-full">
            {["Username 1", "Username 2", "Username 3"].map((name) => (
              <a
                key={name}
                href="#"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                {name}
              </a>
            ))}
          </div>
        </div>

        {/* Dropdown Button - Modified */}
        <div className="relative group">
          <button className="w-full sm:w-36 p-3 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">
            Modified ▼
          </button>
          <div className="absolute hidden group-hover:block bg-white border border-gray-200 shadow-lg rounded-md mt-1 w-full">
            {["Recently", "Yesterday", "A week ago", "A month ago"].map(
              (time) => (
                <a
                  key={time}
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  {time}
                </a>
              )
            )}
          </div>
        </div>
      </div>

      {/* Centered Image */}
      <div className="flex justify-center mb-6 w-full max-w-xs sm:max-w-md">
        <img
          src="/images/nothing.png"
          alt="No Shared Files"
          className="w-full rounded-lg p-5 bg-transparent"
        />
      </div>

      {/* Info Text */}
      <div className="text-center text-gray-700 max-w-md">
        <div className="text-lg font-semibold mb-2">
          <strong>Nothing has been shared with you yet.</strong>
        </div>
        <div className="text-gray-500 text-sm sm:text-base">
          Use the new button to upload.{" "}
          <a href="#" className="text-blue-500 underline hover:text-blue-700">
            Learn more
          </a>
          .
        </div>
      </div>
    </div>
  );
};

export default Index;
