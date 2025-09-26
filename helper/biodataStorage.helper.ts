// Biodata localStorage utility functions
export interface BiodataStepOne {
  fullName: string;
  placeOfBirth: string;
  height: string;
  portAirport: string;
  religion: string;
  ageOfChildren: string;
  nationality: string;
  weight: string;
  maritalStatus: string;
  educationLevel: string;
  numberOfChildren: string;
  dob?: Date;
  imagePreview?: string;
}

export interface BiodataStepTwo {
  allergies: string;
  physicalDisabilities: string;
  mentalIllness: string;
  diabetes: string;
  heartDisease: string;
  epilepsy: string;
  asthma: string;
  hypertension: string;
  malaria: string;
  tuberculosis: string;
  operations: string;
  others: string;
  dietaryRestrictions: string;
  preferenceForRestDay: string;
}

export interface AreaOfWork {
  areaOfWork: string;
  willingness: string;
  experience: string;
  assessment: string;
}

export interface BiodataStepThree {
  anyOtherRemarks: string;
  areasOfWork: AreaOfWork[];
}

export interface BiodataStepFour {
  areasOfWork: AreaOfWork[];
  employmentHistory: {
    dateFrom: string;
    dateTo: string;
    country: string;
    employer: string;
    workDuties: string;
    remarks: string;
    otherRemarks: string;
  };
}

export interface CompleteBiodata {
  stepOne: BiodataStepOne;
  stepTwo: BiodataStepTwo;
  stepThree: BiodataStepThree;
  stepFour: BiodataStepFour;
  submittedAt?: Date;
}

const BIODATA_STORAGE_KEY = 'biodata_form_data';

// Save individual step data
export const saveBiodataStep = (step: string, data: any) => {
  try {
    const existingData = getCompleteBiodata();
    const updatedData = {
      ...existingData,
      [step]: data,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(BIODATA_STORAGE_KEY, JSON.stringify(updatedData));
    return true;
  } catch (error) {
    console.error('Error saving biodata step:', error);
    return false;
  }
};

// Get individual step data
export const getBiodataStep = (step: string) => {
  try {
    const data = localStorage.getItem(BIODATA_STORAGE_KEY);
    if (data) {
      const parsedData = JSON.parse(data);
      return parsedData[step] || null;
    }
    return null;
  } catch (error) {
    console.error('Error getting biodata step:', error);
    return null;
  }
};

// Get complete biodata
export const getCompleteBiodata = (): Partial<CompleteBiodata> => {
  try {
    const data = localStorage.getItem(BIODATA_STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return {};
  } catch (error) {
    console.error('Error getting complete biodata:', error);
    return {};
  }
};

// Clear all biodata data
export const clearBiodataData = () => {
  try {
    localStorage.removeItem(BIODATA_STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing biodata data:', error);
    return false;
  }
};

// Check if all steps are completed
export const isBiodataComplete = (): boolean => {
  const data = getCompleteBiodata();
  return !!(data.stepOne && data.stepTwo && data.stepThree && data.stepFour);
};

// Get completion status
export const getBiodataCompletionStatus = () => {
  const data = getCompleteBiodata();
  return {
    stepOne: !!data.stepOne,
    stepTwo: !!data.stepTwo,
    stepThree: !!data.stepThree,
    stepFour: !!data.stepFour,
    isComplete: isBiodataComplete()
  };
};
