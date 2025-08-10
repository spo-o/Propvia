import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronRight, Shield } from "lucide-react";
import { useState } from "react";
import { useToastStore } from "../store/toastStore";
import { useNavigate } from "react-router-dom";
import { submitPropertyRequest } from "../api/propertyRequest";
import { API_BASE_URL } from "../config";
import {
  CustomPropertyType,
  entity_type_options,
  experience_level_options,
  help_level_options,
  intended_use_options,
  ownership_status_options,
  timeline_options,
} from "../types";
import { useForm } from "react-hook-form";

interface CustomPropertyFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CustomPropertyForm({
  open,
  onOpenChange,
}: CustomPropertyFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CustomPropertyType>({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      entity_type: "",
      company_name: "",
      experience_level: "",
      address: "",
      sqft: "",
      year_built: "",
      current_use: "",
      ownership_status: "",
      intended_use: "",
      timeline: "",
      help_level: "",
      description: "",
    },
  });

  const [selectedPackage, setSelectedPackage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const showToast = useToastStore(state => state.showToast);

  const formData = watch();

  const onSubmit = async (data: CustomPropertyType) => {
    const requiredFields = [
      "first_name",
      "last_name",
      "email",
      "phone",
      "entity_type",
      "experience_level",
      "address",
      "sqft",
      "year_built",
      "current_use",
      "ownership_status",
      "intended_use",
      "timeline",
      "help_level",
    ];

    for (const field of requiredFields) {
      if (!data[field as keyof typeof data]) {
        showToast(`Please fill out ${field.replace(/_/g, " ")}`, "error");
        return;
      }
    }

    if (!selectedPackage) {
      showToast("Please select a package", "error");
      return;
    }

    setIsProcessing(true);

    try {
      const savePropertyResponse = await fetch(`${API_BASE_URL}/saveProperty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, selectedPackage }),
      });

      const savePropertyResult = await savePropertyResponse.json();

      if (!savePropertyResponse.ok) {
        showToast(savePropertyResult.error || "Failed to submit request", "error");
        setIsProcessing(false)
        return;
      }

      console.log(savePropertyResult)
      const requestId = savePropertyResult.id



      // create the checkout session
      const checkoutRes = await fetch("https://propvia-be.onrender.com/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageTier: selectedPackage.toLowerCase(),
          customerEmail: data.email,
          first_name: data.first_name,
          propertyRequestId: requestId,
          formData: data, // full object
        }),
      });
      

      const checkoutJson = await checkoutRes.json();

      if (!checkoutRes.ok) {
        showToast(checkoutJson.error || "Stripe error", "error");
        return;
      }

      window.location.href = checkoutJson.url; // Redirect to Stripe
    } catch (err) {
      showToast("Something went wrong. Please try again.", "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const packages = {
    basic: {
      name: "Basic Custom Report",
      description: " Early-stage buyers, casual explorers",
      price: 100,
      features: [
        "1 highest-potential use for your submitted property",
        "Opportunity & Community Score breakdown",
        "One-page summary PDF with simple visual charts",
        "General next-step guidance",
      ],
    },
    standard: {
      name: "Standard Custom Report",
      description: "Side Projects, non profit use, grant support.",
      price: 250,
      features: [
        "2–3 top recommended uses (tailored to zoning + demand)",
        "Detailed Opportunity & Community metrics",
        "Competitor landscape (within 0.5–1 mile radius)",
        "High-level 5-year financial estimate",
        "PDF formatted for sharing with funders or co-investors",
      ],
    },
    premium: {
      name: "Premium Custom Report",
      description: "Institutional investors, land banks, CDFIs.",
      price: 500,
      features: [
        "Everything in Standard",
        "Detailed cost-to-build and breakeven forecast",
        "5-year net revenue & cashflow model",
        "Zoning compliance check + barrier/risk flags",
        "Personalized strategic use match + why it wins",
        "Custom “What to Do Next” roadmap",
      ],
    },
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[1000]" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[95vh] w-[95vw] max-w-[1000px] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white shadow-xl overflow-y-auto z-[1001]">
          <div className="relative max-h-full">
            {/* Enhanced Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 p-6 rounded-t-lg z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand to-brand-600 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                  <div>
                    <Dialog.Title className="text-2xl font-bold bg-gradient-to-r from-brand to-brand-600 bg-clip-text text-transparent">
                      Transform Detroit Properties
                    </Dialog.Title>
                    <Dialog.Description className="text-gray-600 mt-1">
                      Get AI-powered insights and actionable recommendations
                    </Dialog.Description>
                  </div>
                </div>
                <Dialog.Close className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all duration-200">
                  <X className="w-6 h-6" />
                </Dialog.Close>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-8">
            {/* Contact Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                  <span className="text-brand font-semibold text-sm">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Contact Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("first_name", { required: true })}
                    className="input-field"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("last_name", { required: true })}
                    className="input-field"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email", { required: true })}
                    className="input-field"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[\+]?[1-9][\d]{0,15}$/,
                        message: "Please enter a valid phone number (digits only, no spaces or special characters)",
                      },
                      minLength: {
                        value: 10,
                        message: "Phone number must be at least 10 digits"
                      },
                      maxLength: {
                        value: 15,
                        message: "Phone number cannot exceed 15 digits"
                      }
                    })}
                    className="input-field"
                    placeholder="1234567890"
                    onInput={(e) => {
                      // Only allow digits and plus sign at the beginning
                      const target = e.target as HTMLInputElement;
                      target.value = target.value.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');
                    }}
                    required
                  />
                  {errors.phone && (
                    <span className="text-red-500 text-xs mt-1 block">
                      {errors.phone.message}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Entity Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                  <span className="text-brand font-semibold text-sm">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Entity Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Entity <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("entity_type", { required: true })}
                    className="input-field"
                    required
                  >
                    {entity_type_options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name (if applicable)
                  </label>
                  <input
                    type="text"
                    {...register("company_name")}
                    className="input-field"
                    placeholder="Your company name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience Level <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("experience_level", { required: true })}
                    className="input-field"
                    required
                  >
                    {experience_level_options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Property Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                  <span className="text-brand font-semibold text-sm">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Property Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Property Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Address
                  </label>
                  <input
                    type="text"
                    {...register("address", { required: true })}
                    className="input-field"
                    required
                  />
                </div>
                {/* Square Footage */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Square Footage
                  </label>
                  <input
                    type="number"
                    {...register("sqft", {
                      required: "Square Footage is required",
                      valueAsNumber: true,
                      min: {
                        value: 1,
                        message: "Square Footage must be greater than 0",
                      },
                      max: {
                        value: 1000000,
                        message: "Square Footage seems too large",
                      },
                      validate: value =>
                        (Number.isFinite(value) && Number(value) > 0) ||
                        "Square Footage must be a positive number",
                    })}
                    className="input-field"
                    min="1"
                    step="1"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (parseFloat(target.value) < 0) {
                        target.value = '';
                      }
                    }}
                    onKeyDown={(e) => {
                      // Prevent minus key
                      if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                        e.preventDefault();
                      }
                    }}
                    required
                  />
                  {errors.sqft && (
                    <span className="text-red-500 text-xs">
                      {errors.sqft.message}
                    </span>
                  )}
                </div>
                {/* Year Built */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year Built
                  </label>
                  <input
                    type="number"
                    {...register("year_built", {
                      required: "Year Built is required",
                      valueAsNumber: true,
                      min: {
                        value: 1800,
                        message: "Year Built must be after 1800",
                      },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year Built cannot be in the future",
                      },
                      validate: value =>
                        (Number.isFinite(value) && Number(value) >= 1800 && Number(value) <= new Date().getFullYear()) ||
                        "Year Built must be a valid year between 1800 and current year",
                    })}
                    className="input-field"
                    min="1800"
                    max={new Date().getFullYear()}
                    step="1"
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      const currentYear = new Date().getFullYear();
                      let value = parseFloat(target.value);
                      
                      // Prevent negative numbers
                      if (value < 0) {
                        target.value = '';
                        return;
                      }
                      
                      // Validate range
                      if (value < 1800 || value > currentYear) {
                        target.setCustomValidity(`Year must be between 1800 and ${currentYear}`);
                      } else {
                        target.setCustomValidity('');
                      }
                    }}
                    onKeyDown={(e) => {
                      // Prevent minus key
                      if (e.key === '-' || e.key === 'e' || e.key === 'E' || e.key === '+') {
                        e.preventDefault();
                      }
                    }}
                    required
                  />
                  {errors.year_built && (
                    <span className="text-red-500 text-xs">
                      {errors.year_built.message}
                    </span>
                  )}
                </div>
                {/* Current Use */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Use
                  </label>
                  <input
                    type="text"
                    {...register("current_use", { required: true })}
                    className="input-field"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                  <span className="text-brand font-semibold text-sm">4</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Project Details</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Ownership Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ownership Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("ownership_status", { required: true })}
                    className="input-field"
                    required
                  >
                    {ownership_status_options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Intended Use */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intended Use <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("intended_use", { required: true })}
                    className="input-field"
                    required
                  >
                    {intended_use_options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Project Timeline */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Timeline <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("timeline", { required: true })}
                    className="input-field"
                    required
                  >
                    {timeline_options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Help Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level of Help Needed <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register("help_level", { required: true })}
                    className="input-field"
                    required
                  >
                    {help_level_options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-brand/10 rounded-lg flex items-center justify-center">
                  <span className="text-brand font-semibold text-sm">5</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Additional Details</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Information
                </label>
                <textarea
                  {...register("description")}
                  className="input-field"
                  rows={4}
                  placeholder="Please provide any additional information about your project..."
                />
              </div>
            </div>

            {/* Package Selection */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-4">
                Select Your Package
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(packages).map(([key, pkg]) => (
                  <div
                    key={key}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPackage === key
                        ? "border-brand bg-brand/5 ring-2 ring-brand"
                        : "hover:border-brand/50"
                    }`}
                    onClick={() => setSelectedPackage(key)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{pkg.name}</h4>
                      <span className="text-lg font-bold">${pkg.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {pkg.description}
                    </p>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Shield className="w-4 h-4 text-brand mt-1 mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isProcessing || !selectedPackage}
                className={`w-full btn-brand ${
                  isProcessing ? 'opacity-75 cursor-not-allowed' : ''
                } flex items-center justify-center space-x-2`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Analysis In Progress</span>
                  </>
                ) : (
                  <>
                    <span>Get Your Analysis</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
              
              <div className="flex items-center justify-center mt-4 space-x-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>Secure payment powered by Stripe</span>
              </div>
            </div>
          </form>
          </div>

          <Dialog.Close className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-500">
            <X className="w-5 h-5" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
