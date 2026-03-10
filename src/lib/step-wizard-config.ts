export interface StepWizardConfig {
  businessName: string;
  businessId: string;
  confirmationPrefix: string;
  formspreeEndpoint: string;
  accentColor: string;
  accentDark: string;
  btnTextColor: string;
  phonePlaceholder: string;
  zipPlaceholder: string;
  deepCleanBundledAddons: string[];
  moveOutBundledAddons: string[];
}

const DEFAULT_DEEP_BUNDLED = [
  'wallStainRemoval',
  'tileAndGrout',
  'baseboardCleaning',
];

const DEFAULT_MOVEOUT_BUNDLED = [
  'bedroomBathroomCabinets',
  'insideKitchenCabinets',
  'interiorWindows',
  'wallStainRemoval',
  'tileAndGrout',
  'baseboardCleaning',
];

export const STEP_WIZARD_CONFIG: StepWizardConfig = {
  businessName: 'Brooklyn Maids',
  businessId: 'brooklyn',
  confirmationPrefix: 'BK',
  formspreeEndpoint: 'mqazolgp',
  accentColor: '#dfbd69',
  accentDark: '#c9a84c',
  btnTextColor: '#283845',
  phonePlaceholder: '(347) 750-4380',
  zipPlaceholder: '11201',
  deepCleanBundledAddons: DEFAULT_DEEP_BUNDLED,
  moveOutBundledAddons: DEFAULT_MOVEOUT_BUNDLED,
};
