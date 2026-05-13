import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  FileCheck,
  GraduationCap,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Rocket,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import Stepper from "../components/auth/Stepper";
import useRotatingIndianTitle from "../hooks/useRotatingIndianTitle";

const CATEGORY_OPTIONS = [
  {
    key: "student",
    label: "Student",
    description: "Scholarships, education support, loans, and training schemes.",
    icon: GraduationCap,
  },
  {
    key: "farmer",
    label: "Farmer",
    description: "Crop, subsidy, irrigation, insurance, and welfare programs.",
    icon: Leaf,
  },
  {
    key: "startup",
    label: "Startup Founder",
    description: "Startup grants, incubation, loans, and founder incentives.",
    icon: Rocket,
  },
];

const DOCUMENT_OPTIONS = [
  "Aadhaar / Government ID",
  "Income certificate",
  "Student ID / Bonafide certificate",
  "Land record / Farmer ID",
  "Business registration / GST / MSME",
];

const INCOME_OPTIONS = [
  "Below Rs. 2 lakh",
  "Rs. 2 lakh - Rs. 5 lakh",
  "Rs. 5 lakh - Rs. 10 lakh",
  "Above Rs. 10 lakh",
];

const STARTUP_STAGES = ["Idea stage", "Prototype", "Early revenue", "Scaling"];

const FIELD_CLASS =
  "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 transition focus:border-sky-400 focus:outline-none focus:ring-4 focus:ring-sky-100";

function InputField({
  label,
  icon: Icon,
  className = "",
  ...props
}: any) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className={`flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 transition focus-within:border-sky-400 focus-within:ring-4 focus-within:ring-sky-100 ${className}`}>
        {Icon ? <Icon size={18} className="text-slate-400" /> : null}
        <input {...props} className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400" />
      </div>
    </label>
  );
}

function SelectField({ label, children, ...props }: any) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <select {...props} className={FIELD_CLASS}>
        {children}
      </select>
    </label>
  );
}

function StepActions({ back, next, nextLabel = "Next", disabled }: any) {
  return (
    <div className="flex items-center justify-between gap-3 pt-2">
      <button
        type="button"
        onClick={back}
        className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Back
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={next}
        className={`rounded-2xl px-5 py-3 text-sm font-medium transition ${
          disabled
            ? "cursor-not-allowed bg-slate-200 text-slate-400"
            : "bg-slate-950 text-white hover:bg-slate-800"
        }`}
      >
        {nextLabel}
      </button>
    </div>
  );
}

function Step1({ formData, setFormData, next, isValid }: any) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-600">Step 1</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Create your account</h2>
        <p className="mt-2 text-sm text-slate-500">
          Start with the core contact details PolicyLens needs to create your profile.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="First Name"
          icon={UserRound}
          placeholder="Enter first name"
          value={formData.firstName}
          onChange={(e: any) => setFormData({ ...formData, firstName: e.target.value })}
        />

        <InputField
          label="Last Name"
          icon={UserRound}
          placeholder="Enter last name"
          value={formData.lastName}
          onChange={(e: any) => setFormData({ ...formData, lastName: e.target.value })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Email"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={(e: any) => setFormData({ ...formData, email: e.target.value })}
        />

        <InputField
          label="Phone Number"
          icon={Phone}
          type="tel"
          placeholder="10-digit mobile number"
          value={formData.phone}
          onChange={(e: any) => setFormData({ ...formData, phone: e.target.value })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Password"
          icon={ShieldCheck}
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={(e: any) => setFormData({ ...formData, password: e.target.value })}
        />

        <SelectField
          label="Primary Language"
          value={formData.language}
          onChange={(e: any) => setFormData({ ...formData, language: e.target.value })}
        >
          <option value="">Select language</option>
          <option value="english">English</option>
          <option value="hindi">Hindi</option>
          <option value="telugu">Telugu</option>
          <option value="tamil">Tamil</option>
          <option value="kannada">Kannada</option>
        </SelectField>
      </div>

      <button
        type="button"
        disabled={!isValid}
        onClick={next}
        className={`w-full rounded-2xl py-3 text-sm font-medium transition ${
          isValid
            ? "bg-slate-950 text-white hover:bg-slate-800"
            : "cursor-not-allowed bg-slate-200 text-slate-400"
        }`}
      >
        Continue to Eligibility Profile
      </button>
    </div>
  );
}

function Step2({ formData, setFormData, next, back, isValid }: any) {
  const toggleCategory = (category: string) => {
    const exists = formData.categories.includes(category);
    setFormData({
      ...formData,
      categories: exists
        ? formData.categories.filter((item: string) => item !== category)
        : [...formData.categories, category],
    });
  };

  const toggleDocument = (document: string) => {
    const exists = formData.documents.includes(document);
    setFormData({
      ...formData,
      documents: exists
        ? formData.documents.filter((item: string) => item !== document)
        : [...formData.documents, document],
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-600">Step 2</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Build your eligibility profile</h2>
        <p className="mt-2 text-sm text-slate-500">
          These fields help PolicyLens categorize schemes and evaluate eligibility transparently.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="State"
          icon={MapPin}
          placeholder="State"
          value={formData.state}
          onChange={(e: any) => setFormData({ ...formData, state: e.target.value })}
        />

        <InputField
          label="District"
          icon={MapPin}
          placeholder="District"
          value={formData.district}
          onChange={(e: any) => setFormData({ ...formData, district: e.target.value })}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <InputField
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e: any) => setFormData({ ...formData, dateOfBirth: e.target.value })}
        />

        <SelectField
          label="Annual Household Income"
          value={formData.incomeRange}
          onChange={(e: any) => setFormData({ ...formData, incomeRange: e.target.value })}
        >
          <option value="">Select income range</option>
          {INCOME_OPTIONS.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </SelectField>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-slate-700">Which policy categories apply to you?</p>
          <p className="mt-1 text-xs text-slate-500">Select every role that should be considered for policy matching.</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {CATEGORY_OPTIONS.map((category) => {
            const Icon = category.icon;
            const active = formData.categories.includes(category.key);

            return (
              <button
                key={category.key}
                type="button"
                onClick={() => toggleCategory(category.key)}
                className={`rounded-3xl border p-4 text-left transition ${
                  active
                    ? "border-sky-500 bg-sky-50 shadow-sm"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
                    active ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-500"
                  }`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">{category.label}</p>
                    <p className="text-xs text-slate-500">{category.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-slate-700">Available supporting documents</p>
          <p className="mt-1 text-xs text-slate-500">This helps recommend next actions and document checklists.</p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {DOCUMENT_OPTIONS.map((document) => (
            <button
              key={document}
              type="button"
              onClick={() => toggleDocument(document)}
              className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                formData.documents.includes(document)
                  ? "border-emerald-500 bg-emerald-50 text-emerald-900"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <FileCheck size={18} />
              <span className="text-sm font-medium">{document}</span>
            </button>
          ))}
        </div>
      </div>

      <StepActions back={back} next={next} disabled={!isValid} />
    </div>
  );
}

function Step3({ formData, setFormData, next, back, isValid }: any) {
  const updateSection = (section: string, field: string, value: string) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-600">Step 3</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Add category-specific details</h2>
        <p className="mt-2 text-sm text-slate-500">
          These details power the eligibility indicator, criteria checklist, and action suggestions in PolicyLens.
        </p>
      </div>

      {formData.categories.includes("student") && (
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
              <GraduationCap size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Student profile</h3>
              <p className="text-sm text-slate-500">Capture education details used by student-focused schemes.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Education Level"
              value={formData.student.educationLevel}
              onChange={(e: any) => updateSection("student", "educationLevel", e.target.value)}
            >
              <option value="">Select education level</option>
              <option value="school">School</option>
              <option value="undergraduate">Undergraduate</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="vocational">Vocational / Skill training</option>
            </SelectField>

            <SelectField
              label="Year of Study"
              value={formData.student.yearOfStudy}
              onChange={(e: any) => updateSection("student", "yearOfStudy", e.target.value)}
            >
              <option value="">Select year</option>
              <option value="1">1st year</option>
              <option value="2">2nd year</option>
              <option value="3">3rd year</option>
              <option value="4">4th year or above</option>
            </SelectField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Institution Name"
              placeholder="College / school / training institute"
              value={formData.student.institutionName}
              onChange={(e: any) => updateSection("student", "institutionName", e.target.value)}
            />

            <SelectField
              label="Institution Type"
              value={formData.student.institutionType}
              onChange={(e: any) => updateSection("student", "institutionType", e.target.value)}
            >
              <option value="">Select institution type</option>
              <option value="government">Government</option>
              <option value="private">Private</option>
              <option value="aided">Aided</option>
            </SelectField>
          </div>
        </div>
      )}

      {formData.categories.includes("farmer") && (
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Leaf size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Farmer profile</h3>
              <p className="text-sm text-slate-500">Capture land, crop, and farming context for agricultural schemes.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Land Holding (acres)"
              type="number"
              placeholder="Enter land size"
              value={formData.farmer.landHolding}
              onChange={(e: any) => updateSection("farmer", "landHolding", e.target.value)}
            />

            <SelectField
              label="Farming Type"
              value={formData.farmer.farmingType}
              onChange={(e: any) => updateSection("farmer", "farmingType", e.target.value)}
            >
              <option value="">Select farming type</option>
              <option value="marginal">Marginal farmer</option>
              <option value="small">Small farmer</option>
              <option value="tenant">Tenant farmer</option>
              <option value="organic">Organic farmer</option>
            </SelectField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Primary Crop"
              placeholder="Rice, wheat, cotton, etc."
              value={formData.farmer.primaryCrop}
              onChange={(e: any) => updateSection("farmer", "primaryCrop", e.target.value)}
            />

            <SelectField
              label="Irrigation Access"
              value={formData.farmer.irrigationAccess}
              onChange={(e: any) => updateSection("farmer", "irrigationAccess", e.target.value)}
            >
              <option value="">Select irrigation status</option>
              <option value="full">Full irrigation</option>
              <option value="partial">Partial irrigation</option>
              <option value="rainfed">Rainfed only</option>
            </SelectField>
          </div>
        </div>
      )}

      {formData.categories.includes("startup") && (
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50/80 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-fuchsia-100 text-fuchsia-700">
              <Rocket size={20} />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Startup founder profile</h3>
              <p className="text-sm text-slate-500">Capture startup maturity and registration details for founder incentives.</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Startup Name"
              placeholder="Enter startup name"
              value={formData.startup.startupName}
              onChange={(e: any) => updateSection("startup", "startupName", e.target.value)}
            />

            <InputField
              label="Sector"
              placeholder="Fintech, AgriTech, HealthTech, etc."
              value={formData.startup.sector}
              onChange={(e: any) => updateSection("startup", "sector", e.target.value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              label="Startup Stage"
              value={formData.startup.stage}
              onChange={(e: any) => updateSection("startup", "stage", e.target.value)}
            >
              <option value="">Select startup stage</option>
              {STARTUP_STAGES.map((stage) => (
                <option key={stage} value={stage}>{stage}</option>
              ))}
            </SelectField>

            <SelectField
              label="Incorporation Status"
              value={formData.startup.incorporationStatus}
              onChange={(e: any) => updateSection("startup", "incorporationStatus", e.target.value)}
            >
              <option value="">Select incorporation status</option>
              <option value="registered">Registered company</option>
              <option value="dpiit">DPIIT recognized startup</option>
              <option value="not-registered">Not yet registered</option>
            </SelectField>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <InputField
              label="Team Size"
              type="number"
              placeholder="Number of team members"
              value={formData.startup.teamSize}
              onChange={(e: any) => updateSection("startup", "teamSize", e.target.value)}
            />

            <SelectField
              label="Revenue Stage"
              value={formData.startup.revenueStage}
              onChange={(e: any) => updateSection("startup", "revenueStage", e.target.value)}
            >
              <option value="">Select revenue stage</option>
              <option value="pre-revenue">Pre-revenue</option>
              <option value="early-revenue">Early revenue</option>
              <option value="stable-revenue">Stable revenue</option>
            </SelectField>
          </div>
        </div>
      )}

      <StepActions back={back} next={next} disabled={!isValid} nextLabel="Review profile" />
    </div>
  );
}

function ReviewRow({ label, value }: any) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-900">{value || "Not provided"}</p>
    </div>
  );
}

function Step4({ formData, back }: any) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-600">Step 4</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900">Review your policy profile</h2>
        <p className="mt-2 text-sm text-slate-500">
          This summary is what PolicyLens will use to categorize policies, explain criteria, and recommend actions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <ReviewRow label="Full Name" value={`${formData.firstName} ${formData.lastName}`.trim()} />
        <ReviewRow label="Email" value={formData.email} />
        <ReviewRow label="Phone" value={formData.phone} />
        <ReviewRow label="Location" value={[formData.district, formData.state].filter(Boolean).join(", ")} />
        <ReviewRow label="Income Range" value={formData.incomeRange} />
        <ReviewRow
          label="Selected Categories"
          value={formData.categories.map((key: string) => CATEGORY_OPTIONS.find((item) => item.key === key)?.label).join(", ")}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <BadgeCheck size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Profile readiness</h3>
            <p className="text-sm text-slate-500">
              Documents added: {formData.documents.length} • Categories mapped: {formData.categories.length}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={back}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Back
        </button>

        <button
          type="button"
          className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-emerald-700"
        >
          Submit profile
        </button>
      </div>
    </div>
  );
}

function RegisterPage() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const brandVariant = useRotatingIndianTitle();

  const next = () => setStep((prev) => Math.min(prev + 1, 4));
  const back = () => setStep((prev) => Math.max(prev - 1, 1));

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    language: "",
    state: "",
    district: "",
    dateOfBirth: "",
    incomeRange: "",
    categories: [] as string[],
    documents: [] as string[],
    student: {
      educationLevel: "",
      yearOfStudy: "",
      institutionName: "",
      institutionType: "",
    },
    farmer: {
      landHolding: "",
      farmingType: "",
      primaryCrop: "",
      irrigationAccess: "",
    },
    startup: {
      startupName: "",
      sector: "",
      stage: "",
      incorporationStatus: "",
      teamSize: "",
      revenueStage: "",
    },
  });

  const isStep1Valid =
    Boolean(formData.firstName) &&
    Boolean(formData.lastName) &&
    Boolean(formData.email) &&
    Boolean(formData.phone) &&
    Boolean(formData.password) &&
    Boolean(formData.language);

  const isStep2Valid =
    Boolean(formData.state) &&
    Boolean(formData.district) &&
    Boolean(formData.dateOfBirth) &&
    Boolean(formData.incomeRange) &&
    formData.categories.length > 0;

  const categoryValidators: Record<string, boolean> = {
    student:
      Boolean(formData.student.educationLevel) &&
      Boolean(formData.student.yearOfStudy) &&
      Boolean(formData.student.institutionName) &&
      Boolean(formData.student.institutionType),
    farmer:
      Boolean(formData.farmer.landHolding) &&
      Boolean(formData.farmer.farmingType) &&
      Boolean(formData.farmer.primaryCrop) &&
      Boolean(formData.farmer.irrigationAccess),
    startup:
      Boolean(formData.startup.startupName) &&
      Boolean(formData.startup.sector) &&
      Boolean(formData.startup.stage) &&
      Boolean(formData.startup.incorporationStatus) &&
      Boolean(formData.startup.teamSize) &&
      Boolean(formData.startup.revenueStage),
  };

  const isStep3Valid =
    formData.categories.length > 0 &&
    formData.categories.every((category) => categoryValidators[category]);

  const steps = ["Account", "Eligibility", "Category Details", "Review"];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef6ff_0%,#f8fafc_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 rounded-[32px] border border-white/70 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(30,41,59,0.94))] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)] md:p-8">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-sky-200">
            {brandVariant.text} • {brandVariant.language}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Build a profile that powers transparent policy matching
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            We collect only the information needed to categorize schemes, evaluate eligibility, explain reasoning, and suggest next actions for profiles like students, farmers, and startup founders.
          </p>
        </div>

        <div className="rounded-[32px] border border-slate-200/70 bg-white/92 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl md:p-8">
          <Stepper step={step} steps={steps} />

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
              <Step3
                formData={formData}
                setFormData={setFormData}
                next={next}
                back={back}
                isValid={isStep3Valid}
              />
            )}

            {step === 4 && <Step4 formData={formData} back={back} />}

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="cursor-pointer font-semibold text-sky-600 hover:text-sky-700 hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
