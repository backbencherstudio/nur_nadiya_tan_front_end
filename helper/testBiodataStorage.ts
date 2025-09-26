// Test file for biodata storage functionality
import {
    BiodataStepFour,
    BiodataStepOne,
    BiodataStepThree,
    BiodataStepTwo,
    clearBiodataData,
    getBiodataStep,
    getCompleteBiodata,
    saveBiodataStep
} from './biodataStorage.helper';

// Test data
const testStepOne: BiodataStepOne = {
  fullName: "John Doe",
  placeOfBirth: "New York",
  height: "5'8\"",
  portAirport: "JFK",
  religion: "Christianity",
  ageOfChildren: "5, 8",
  nationality: "American",
  weight: "70kg",
  maritalStatus: "Married",
  educationLevel: "University",
  numberOfChildren: "2",
  dob: new Date('1990-01-01'),
  imagePreview: "data:image/jpeg;base64,..."
};

const testStepTwo: BiodataStepTwo = {
  allergies: "No",
  physicalDisabilities: "No",
  mentalIllness: "No",
  diabetes: "No",
  heartDisease: "No",
  epilepsy: "No",
  asthma: "No",
  hypertension: "No",
  malaria: "No",
  tuberculosis: "No",
  operations: "No",
  others: "None",
  dietaryRestrictions: "No",
  preferenceForRestDay: "Yes"
};

const testStepThree: BiodataStepThree = {
  anyOtherRemarks: "Excellent worker",
  areasOfWork: [
    {
      areaOfWork: "Care of infants/children",
      willingness: "Yes",
      experience: "Yes",
      assessment: "Very good with children"
    },
    {
      areaOfWork: "Care of elderly",
      willingness: "Yes",
      experience: "No",
      assessment: "Willing to learn"
    }
  ]
};

const testStepFour: BiodataStepFour = {
  areasOfWork: [
    {
      areaOfWork: "Cooking",
      willingness: "Yes",
      experience: "Yes",
      assessment: "Excellent cook"
    }
  ],
  employmentHistory: {
    dateFrom: "2020-01-01",
    dateTo: "2023-12-31",
    country: "Singapore",
    employer: "Smith Family",
    workDuties: "Housekeeping and cooking",
    remarks: "Excellent performance",
    otherRemarks: "Highly recommended"
  }
};

// Test functions
export const testBiodataStorage = () => {
  console.log("🧪 Testing Biodata Storage...");
  
  // Clear any existing data
  clearBiodataData();
  
  // Test saving individual steps
  console.log("📝 Testing step saving...");
  const step1Saved = saveBiodataStep('stepOne', testStepOne);
  const step2Saved = saveBiodataStep('stepTwo', testStepTwo);
  const step3Saved = saveBiodataStep('stepThree', testStepThree);
  const step4Saved = saveBiodataStep('stepFour', testStepFour);
  
  console.log("Step 1 saved:", step1Saved);
  console.log("Step 2 saved:", step2Saved);
  console.log("Step 3 saved:", step3Saved);
  console.log("Step 4 saved:", step4Saved);
  
  // Test retrieving individual steps
  console.log("📖 Testing step retrieval...");
  const retrievedStep1 = getBiodataStep('stepOne');
  const retrievedStep2 = getBiodataStep('stepTwo');
  const retrievedStep3 = getBiodataStep('stepThree');
  const retrievedStep4 = getBiodataStep('stepFour');
  
  console.log("Retrieved Step 1:", retrievedStep1);
  console.log("Retrieved Step 2:", retrievedStep2);
  console.log("Retrieved Step 3:", retrievedStep3);
  console.log("Retrieved Step 4:", retrievedStep4);
  
  // Test getting complete biodata
  console.log("📋 Testing complete biodata retrieval...");
  const completeData = getCompleteBiodata();
  console.log("Complete Biodata:", completeData);
  
  // Test data integrity
  console.log("✅ Testing data integrity...");
  const isDataIntact = 
    retrievedStep1?.fullName === testStepOne.fullName &&
    retrievedStep2?.allergies === testStepTwo.allergies &&
    retrievedStep3?.areasOfWork?.length === testStepThree.areasOfWork.length &&
    retrievedStep4?.employmentHistory?.country === testStepFour.employmentHistory.country;
  
  console.log("Data integrity check:", isDataIntact ? "✅ PASSED" : "❌ FAILED");
  
  return {
    allStepsSaved: step1Saved && step2Saved && step3Saved && step4Saved,
    allStepsRetrieved: !!(retrievedStep1 && retrievedStep2 && retrievedStep3 && retrievedStep4),
    dataIntact: isDataIntact,
    completeData
  };
};

// Export for use in browser console
if (typeof window !== 'undefined') {
  (window as any).testBiodataStorage = testBiodataStorage;
}
