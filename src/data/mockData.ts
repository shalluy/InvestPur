// Mock data based on the prompt requirements

export interface Provider {
  id: string;
  name: string;
  logo: string;
}

export interface KeyHighlight {
  label: string;
  value: string;
  subtext?: string;
  color?: 'blue' | 'green' | 'purple';
}

export interface Product {
  id: string;
  title: string;
  providerId: string;
  assetType: 'bond' | 'fd' | 'mutual_fund' | 'etf' | 'govt_scheme' | 'sip' | 'basket';
  minInvestment: number; // This acts as Unit Price for bonds
  tenureMonths?: number;
  expectedYield?: number; // Annualized return (YTM)
  risk: 'low' | 'medium' | 'high';
  creditRating?: string; // e.g., "CRISIL BBB"
  tags: string[];
  description: string;
  // New fields for detailed view
  raisedAmount?: number;
  totalGoal?: number;
  reasonsToInvest?: string[];
  keyHighlights?: KeyHighlight[];
  repaymentSchedule?: {
    interest: string;
    principal: string;
  };
}

export const providers: Provider[] = [
  { id: 'p1', name: 'GoldenBridge Finance', logo: 'https://ui-avatars.com/api/?name=GB&background=eab308&color=fff' },
  { id: 'p2', name: 'Prime Mutuals', logo: 'https://ui-avatars.com/api/?name=PM&background=2563eb&color=fff' },
  { id: 'p3', name: 'Govt Direct', logo: 'https://ui-avatars.com/api/?name=GD&background=dc2626&color=fff' },
  { id: 'p4', name: 'HDFC Bank', logo: 'https://ui-avatars.com/api/?name=HDFC&background=003366&color=fff' },
  { id: 'p5', name: 'ICICI Bank', logo: 'https://ui-avatars.com/api/?name=ICICI&background=f97316&color=fff' },
  { id: 'p6', name: 'Samunnati', logo: 'https://ui-avatars.com/api/?name=Samunnati&background=84cc16&color=fff' },
];

export const products: Product[] = [
  {
    id: '1',
    title: '10-year Government Bond',
    providerId: 'p3',
    assetType: 'bond',
    minInvestment: 1000,
    tenureMonths: 120,
    expectedYield: 7.26,
    risk: 'low',
    creditRating: 'SOVEREIGN',
    tags: ['Sovereign', 'Guaranteed'],
    description: 'Secure long-term investment backed by the Government of India.',
    raisedAmount: 45000000,
    totalGoal: 100000000,
    reasonsToInvest: [
      'Sovereign Guarantee: Backed by the Government of India, offering the highest safety.',
      'Regular Income: Half-yearly interest payments directly to your bank account.',
      'No TDS: No Tax Deducted at Source on interest payments for resident individuals.'
    ],
    keyHighlights: [
      { label: 'Issue Size', value: '₹10,000 Cr', subtext: 'Total issue size', color: 'blue' },
      { label: 'Coupon Rate', value: '7.26%', subtext: 'Paid semi-annually', color: 'green' }
    ],
    repaymentSchedule: { interest: 'Half-Yearly', principal: 'At Maturity' }
  },
  {
    id: '2',
    title: 'Samunnati Agro NCD',
    providerId: 'p6',
    assetType: 'bond',
    minInvestment: 10000, // Unit Price
    tenureMonths: 10,
    expectedYield: 11.5,
    risk: 'medium',
    creditRating: 'CRISIL BBB',
    tags: ['Agri-Infra', 'High Yield'],
    description: 'Invest in a specialized agri-value chain enabler offering attractive short-term returns.',
    raisedAmount: 4320000,
    totalGoal: 15000000,
    reasonsToInvest: [
      'High-Impact Agri-Focused NBFC: Samunnati operates exclusively in India\'s underserved agri-credit market.',
      'Backed by Strong Capital Base: INR 789 Cr net worth and 21.6% CAR as of June 2024.',
      'Short Tenure: Attractive 11.5% yield with a short maturity period of just 10 months.'
    ],
    keyHighlights: [
      { label: 'Equity Raised', value: '₹159 Cr', subtext: 'In Apr \'23 & Q1 FY25', color: 'green' },
      { label: 'Net Worth', value: '₹789 Cr', subtext: 'With 21.6% Capital Adequacy', color: 'blue' }
    ],
    repaymentSchedule: { interest: 'Monthly', principal: 'Monthly' }
  },
  {
    id: '3',
    title: '1-year Fixed Deposit',
    providerId: 'p5',
    assetType: 'fd',
    minInvestment: 5000,
    tenureMonths: 12,
    expectedYield: 7.0,
    risk: 'low',
    creditRating: 'AAA',
    tags: ['Short Term', 'Liquid'],
    description: 'Standard fixed deposit with competitive interest rates.',
    raisedAmount: 12000000,
    totalGoal: 50000000,
    reasonsToInvest: [
      'Guaranteed Returns: Fixed interest rate for the entire tenure.',
      'Liquidity: Premature withdrawal facility available (subject to penalty).',
      'Safety: Insured up to ₹5 Lakhs by DICGC.'
    ],
    keyHighlights: [
      { label: 'Interest Payout', value: 'Quarterly', subtext: 'Compounding option available', color: 'purple' },
      { label: 'Lock-in', value: '7 Days', subtext: 'Minimum period', color: 'blue' }
    ],
    repaymentSchedule: { interest: 'Quarterly', principal: 'At Maturity' }
  },
  {
    id: '4',
    title: 'Axis Bluechip Fund',
    providerId: 'p2',
    assetType: 'mutual_fund',
    minInvestment: 5000,
    expectedYield: 12.5,
    risk: 'medium',
    tags: ['Equity', 'Large Cap'],
    description: 'Invests in top 100 companies by market capitalization.',
    reasonsToInvest: [
      'Bluechip Focus: Invests in established companies with stable track records.',
      'Professional Management: Managed by experienced fund managers.',
      'Diversification: Instant exposure to a basket of top Indian companies.'
    ],
    keyHighlights: [
      { label: 'AUM', value: '₹32,000 Cr', subtext: 'Assets Under Management', color: 'blue' },
      { label: 'Expense Ratio', value: '1.65%', subtext: 'Direct Plan', color: 'green' }
    ],
    repaymentSchedule: { interest: 'N/A', principal: 'On Redemption' }
  },
  {
    id: '5',
    title: 'Parag Parikh Flexi Cap Fund',
    providerId: 'p2',
    assetType: 'mutual_fund',
    minInvestment: 1000,
    expectedYield: 15.2,
    risk: 'medium',
    tags: ['Flexi Cap', 'Value'],
    description: 'Diversified equity fund investing across market capitalizations and sectors.',
    reasonsToInvest: [
      'Global Exposure: Invests up to 35% in international equities.',
      'Value Strategy: Focuses on buying quality stocks at reasonable valuations.',
      'Long Term Wealth: Ideal for investment horizon of 5+ years.'
    ],
    keyHighlights: [
      { label: 'AUM', value: '₹45,000 Cr', subtext: 'Assets Under Management', color: 'blue' },
      { label: 'Exit Load', value: '2%', subtext: 'If redeemed within 365 days', color: 'purple' }
    ],
    repaymentSchedule: { interest: 'N/A', principal: 'On Redemption' }
  },
  {
    id: '6',
    title: 'Small-Cap ETF',
    providerId: 'p1',
    assetType: 'etf',
    minInvestment: 1000,
    expectedYield: 18.5,
    risk: 'high',
    tags: ['High Growth', 'Exchange Traded'],
    description: 'Low cost exposure to small cap companies.',
    reasonsToInvest: [
      'High Growth Potential: Small cap companies often grow faster than large caps.',
      'Low Cost: Lower expense ratio compared to active mutual funds.',
      'Real-time Trading: Buy and sell on the exchange during market hours.'
    ],
    keyHighlights: [
      { label: 'Tracking Error', value: '0.05%', subtext: 'Low deviation from index', color: 'green' },
      { label: 'Liquidity', value: 'High', subtext: 'Daily average volume', color: 'blue' }
    ],
    repaymentSchedule: { interest: 'N/A', principal: 'On Sale' }
  },
  {
    id: '7',
    title: 'SBI Tax Saving FD',
    providerId: 'p3',
    assetType: 'fd',
    minInvestment: 1000,
    tenureMonths: 60,
    expectedYield: 6.5,
    risk: 'low',
    tags: ['Tax Saver', '80C'],
    description: 'Save tax under section 80C with this 5-year lock-in FD.',
    reasonsToInvest: [
      'Tax Benefit: Deduction up to ₹1.5 Lakh under Section 80C.',
      'Safety: Backed by India\'s largest public sector bank.',
      'Compounding: Interest compounded quarterly for higher yield.'
    ],
    keyHighlights: [
      { label: 'Lock-in Period', value: '5 Years', subtext: 'Mandatory for tax benefit', color: 'purple' },
      { label: 'Senior Citizen', value: '+0.5%', subtext: 'Extra interest rate', color: 'green' }
    ],
    repaymentSchedule: { interest: 'Quarterly', principal: 'At Maturity' }
  }
];

export const assetTypes = [
  { id: 'bond', label: 'Bonds', description: 'Fixed income securities with regular interest payments', icon: 'FileText' },
  { id: 'fd', label: 'Fixed Deposits', description: 'Safe & guaranteed returns from banks', icon: 'Building2' },
  { id: 'mutual_fund', label: 'Mutual Funds', description: 'Professionally managed diversified portfolios', icon: 'PieChart' },
  { id: 'sip', label: 'SIP', description: 'Systematic Investment Plans for disciplined investing', icon: 'TrendingUp' },
  { id: 'etf', label: 'ETFs', description: 'Exchange traded funds for index investing', icon: 'BarChart3' },
  { id: 'basket', label: 'Baskets', description: 'Curated portfolios of stocks & funds', icon: 'Briefcase' },
  { id: 'govt_scheme', label: 'Govt Schemes', description: 'Government backed savings schemes', icon: 'Landmark' },
];
