import { useState } from "react";
import Stepper from "../components/auth/Stepper";
import { useNavigate } from "react-router-dom";


/* ================= STEP 1 ================= */
function Step1({ formData, setFormData, next, isValid }: any) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Details</h2>

      <input
        className="w-full border bg-white p-2 rounded"
        placeholder="First Name"
        value={formData.firstName}
        onChange={(e) =>
          setFormData({ ...formData, firstName: e.target.value })
        }
      />

      <input
        className="w-full border bg-white p-2 rounded"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={(e) =>
          setFormData({ ...formData, lastName: e.target.value })
        }
      />

      <input
        className="w-full border bg-white p-2 rounded"
        placeholder="Email"
        value={formData.email}
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />

      <input
        type="password"
        className="w-full border bg-white p-2 rounded"
        placeholder="Password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />

      <button
        disabled={!isValid}
        onClick={next}
        className={`w-full py-2 rounded ${
          isValid
            ? "bg-blue-600 text-white"
            : "bg-gray-300 text-gray-500"
        }`}
      >
        Next
      </button>
    </div>
  );
}

/* ================= STEP 2 ================= */
function Step2({ formData, setFormData, next, back, isValid }: any) {
  const updateBusiness = (index: number, field: string, value: string) => {
    const updated = [...formData.businesses];
    updated[index][field] = value;
    setFormData({ ...formData, businesses: updated });
  };

  const addBusiness = () => {
    setFormData({
      ...formData,
      businesses: [...formData.businesses, { type: "", location: "" }],
    });
  };
  

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Business Details</h2>

      {formData.businesses.map((b: any, i: number) => (
        <div key={i} className="border p-3 rounded bg-gray-50 space-y-2">
          <select
            className="w-full border p-2 rounded bg-white"
            value={b.type}
            onChange={(e) =>
              updateBusiness(i, "type", e.target.value)
            }
          >
            <option value="">Select business type</option>
            <option>Pharmacy</option>
            <option>Grocery</option>
            <option>Manufacturing</option>
          </select>

          <input
            placeholder="Location"
            className="w-full border p-2 rounded bg-white"
            value={b.location}
            onChange={(e) =>
              updateBusiness(i, "location", e.target.value)
            }
          />
        </div>
      ))}

      <button onClick={addBusiness} className="text-blue-500">
        + Add another business
      </button>

      <div className="flex justify-between">
        <button
          onClick={back}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>

        <button
          disabled={!isValid}
          onClick={next}
          className={`px-4 py-2 rounded ${
            isValid
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

/* ================= STEP 4 ================= */
function Step3({ formData, back }: any) {
  return (
    <div className="space-y-4">

      <h2 className="text-xl font-semibold">Review Details</h2>

      {/* Name */}
      <div>
        <label className="text-sm text-gray-500">Full Name</label>
        <input
          value={`${formData.firstName} ${formData.lastName}`}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-sm text-gray-500">Email</label>
        <input
          value={formData.email}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
      </div>

      {/* Businesses */}
      <div>
        <label className="text-sm text-gray-500">Businesses</label>

        {formData.businesses.map((b: any, i: number) => (
          <div key={i} className="space-y-2 mt-2">
            <input
              value={b.type}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
            <input
              value={b.location}
              readOnly
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-2">
        <button
          onClick={back}
          className="bg-gray-300 px-4 py-2 rounded"
        >
          Back
        </button>

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Submit
        </button>
      </div>
    </div>
  );
}

/* ================= MAIN ================= */

function RegisterPage() {
  const [step, setStep] = useState(1);

  const next = () => setStep((prev) => Math.min(prev + 1, 3));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    businesses: [{ type: "", location: "" }],
    preferences: "",
  });

  const isStep1Valid =  
    formData.firstName && formData.email && formData.password;

  const isStep2Valid = 
    formData.businesses.every(
      (b) => b.type && b.location
    );

const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-lg">
        <Stepper step={step} />

        <div className="animate-fade">
          {step === 1 && (
            <Step1
              formData={formData}
              setFormData={setFormData}
              next={next}
              isValid={isStep1Valid}
            />
          )}

          {step === 2 && (
            <Step2
              formData={formData}
              setFormData={setFormData}
              next={next}
              back={back}
              isValid={isStep2Valid}
            />
          )}

          {step === 3 && (
            <Step3 formData={formData} back={back} />
    )}
      <p className="text-center mt-6 text-sm text-gray-500">
      Already have an account?{" "}
      <span
        onClick={() => navigate("/")}
        className="text-blue-500 cursor-pointer hover:underline"
      >
        Login
      </span>
    </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;