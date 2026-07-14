import { useState, useRef } from 'react';
import { registerParticipant } from '../services/api';
import Toast from '../components/Toast';
import type { FormErrors } from '../types';
import qrCodeImage from '../assets/gpay-screenshot.jpg';
import registerImage from '../assets/register.webp';
import { User, MapPin, CreditCard, CheckCircle, ChevronRight, ChevronLeft, X, AlertCircle, Phone, Hash, Building2, Landmark, Wallet, Image, Sparkles, ArrowRight, PartyPopper, Trophy } from 'lucide-react';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry'
];

const STEP_META = [
  { id: 1, label: 'About You', icon: User },
  { id: 2, label: 'Where You Are', icon: MapPin },
  { id: 3, label: 'Payment', icon: CreditCard },
];

const TOTAL_STEPS = STEP_META.length;
const STEP_FIELDS: Record<number, string[]> = {
  1: ['category', 'name', 'father_name'],
  2: ['phone', 'age', 'address', 'district', 'state'],
  3: ['upi_id', 'payment_screenshot'],
};

const Registration = () => {
  const [formData, setFormData] = useState({
    category: '', name: '', father_name: '', phone: '', age: '',
    address: '', district: '', state: '', upi_id: '',
  });
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [regNumber, setRegNumber] = useState('');
  const [step, setStep] = useState(1);
  const fileRef = useRef<HTMLInputElement>(null);

  const validateField = (field: string, allErrors: FormErrors) => {
    switch (field) {
      case 'category': if (!formData.category) allErrors.category = 'Please select a category'; break;
      case 'name': if (!formData.name.trim()) allErrors.name = 'Name is required'; break;
      case 'father_name': if (!formData.father_name.trim()) allErrors.father_name = "Father's name is required"; break;
      case 'phone':
        if (!formData.phone.trim()) allErrors.phone = 'Phone number is required';
        else if (!/^[0-9]{10}$/.test(formData.phone)) allErrors.phone = 'Phone must be exactly 10 digits';
        break;
      case 'age':
        if (!formData.age.trim()) allErrors.age = 'Age is required';
        else if (!/^[0-9]+$/.test(formData.age) || parseInt(formData.age) < 1 || parseInt(formData.age) > 150) allErrors.age = 'Please enter a valid age';
        break;
      case 'address': if (!formData.address.trim()) allErrors.address = 'Address is required'; break;
      case 'district': if (!formData.district.trim()) allErrors.district = 'District is required'; break;
      case 'state': if (!formData.state.trim()) allErrors.state = 'State is required'; break;
      case 'upi_id': if (!formData.upi_id.trim()) allErrors.upi_id = 'UPI ID is required'; break;
      case 'payment_screenshot':
        if (!screenshot) allErrors.payment_screenshot = 'Payment screenshot is required';
        else if (!['image/jpeg', 'image/png', 'image/jpg'].includes(screenshot.type)) allErrors.payment_screenshot = 'Only JPG, JPEG, and PNG files are allowed';
        else if (screenshot.size > 10 * 1024 * 1024) allErrors.payment_screenshot = 'File size must be less than 10MB';
        break;
    }
    return allErrors;
  };

  const validate = (): boolean => {
    let newErrors: FormErrors = {};
    Object.values(STEP_FIELDS).flat().forEach((f) => { newErrors = validateField(f, newErrors); });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep = (): boolean => {
    let stepErrors: FormErrors = {};
    STEP_FIELDS[step].forEach((f) => { stepErrors = validateField(f, stepErrors); });
    setErrors((prev) => {
      const merged = { ...prev };
      STEP_FIELDS[step].forEach((f) => delete merged[f]);
      return { ...merged, ...stepErrors };
    });
    return Object.keys(stepErrors).length === 0;
  };

  const goNext = () => { if (validateStep()) setStep((s) => Math.min(s + 1, TOTAL_STEPS)); };
  const goBack = () => { setStep((s) => Math.max(s - 1, 1)); };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      if (errors.payment_screenshot) setErrors((prev) => ({ ...prev, payment_screenshot: '' }));
    }
  };

  const removeScreenshot = () => { setScreenshot(null); setPreview(''); if (fileRef.current) fileRef.current.value = ''; };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => fd.append(k, v));
      if (screenshot) fd.append('payment_screenshot', screenshot);
      const res = await registerParticipant(fd);
      setRegNumber(res.data.registration_number);
      setSubmitted(true);
      setToast({ message: res.message, type: 'success' });
    } catch (err: any) {
      setToast({ message: err.response?.data?.message || 'Registration failed. Please try again.', type: 'error' });
    } finally { setLoading(false); }
  };

  const selectClass = (field: string) => `w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-white/90 transition-all duration-200 text-sm appearance-none cursor-pointer outline-none ${errors[field] ? 'border-red-300 bg-red-50/50' : 'border-gray-200 focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100'}`;
  const inputClass = (field: string) => `w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-white/90 transition-all duration-200 text-sm outline-none ${errors[field] ? 'border-red-300 bg-red-50/50' : 'border-gray-200 focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100'}`;
  const textareaClass = (field: string) => `w-full pl-11 pr-4 py-3 rounded-xl border-2 bg-white/90 transition-all duration-200 text-sm resize-none outline-none ${errors[field] ? 'border-red-300 bg-red-50/50' : 'border-gray-200 focus:border-maroon-400 focus:ring-2 focus:ring-maroon-100'}`;
  const iconWrap = 'absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none';
  const errCss = 'mt-1.5 text-xs text-red-500 flex items-center gap-1';

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-maroon-950 via-maroon-900 to-[#1a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-maroon-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl" />
        </div>
        <div className="relative w-full max-w-lg animate-[fadeUp_0.6s_ease-out]">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 md:p-10 border border-white/10 shadow-2xl">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                  <CheckCircle className="w-14 h-14 text-white" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-1 -right-1">
                  <PartyPopper className="w-8 h-8 text-amber-400 animate-bounce" />
                </div>
              </div>
            </div>
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Registration Successful!</h2>
              <p className="text-amber-200/80">Thank you for registering</p>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-300" />
              <div className="relative bg-gradient-to-br from-maroon-950 to-maroon-900 rounded-2xl p-6 border border-amber-500/20 text-center">
                <p className="text-amber-300/70 text-sm mb-2 tracking-widest uppercase">Registration Number</p>
                <div className="flex items-center justify-center gap-3">
                  <Trophy className="w-6 h-6 text-amber-400" />
                  <h3 className="text-3xl md:text-4xl font-bold tracking-[0.2em] text-amber-300">{regNumber}</h3>
                </div>
                <div className="mt-4 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
                <p className="text-gray-400 text-xs mt-4">Please save this number for future reference</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 my-6">
              {[...Array(5)].map((_, i) => <div key={i} className="w-2 h-2 rounded-full bg-amber-500/40 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />)}
            </div>
            <button onClick={() => window.location.reload()} className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-maroon-950 font-bold py-4 px-6 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Register Another Participant
            </button>
          </div>
        </div>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon-50 via-white to-amber-50 flex items-center justify-center px-3 py-6 sm:p-6">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_40px_rgba(120,0,20,0.08)] border border-white/60 overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Pure Image Layer */}
        <div className="hidden md:block md:w-[40%] relative min-h-[500px]">
          <img 
            src={registerImage} 
            alt="Bharatanatyam Registration Banner" 
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </div>

        {/* Right Side: Form Content Layer */}
        <div className="flex-1 p-5 sm:p-6 md:p-10">
          {/* Mobile Top Progress Bar Indicator */}
          <div className="flex md:hidden items-center justify-between mb-6">
            {STEP_META.map((s, idx) => {
              const SI = s.icon; const act = step === s.id; const done = step > s.id;
              return (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${act ? 'bg-maroon-700 text-white shadow-md' : done ? 'bg-maroon-100 text-maroon-700' : 'bg-gray-100 text-gray-400'}`}>
                      {done ? <CheckCircle className="w-4 h-4" /> : <SI className="w-4 h-4" />}
                    </div>
                    <span className={`text-[10px] leading-tight text-center max-w-[60px] ${act ? 'text-maroon-800 font-semibold' : 'text-gray-400'}`}>{s.label}</span>
                  </div>
                  {idx < STEP_META.length - 1 && <div className={`flex-1 h-0.5 mx-1 mb-4 ${done ? 'bg-maroon-400' : 'bg-gray-200'}`} />}
                </div>
              );
            })}
          </div>
          
          {/* Desktop/Tablet Progress Header */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Step {step} of {TOTAL_STEPS}</p>
            <h2 className="text-xl md:text-2xl font-bold text-maroon-900 mt-0.5">{STEP_META[step - 1].label}</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 && (
              <div className="space-y-4 animate-[fadeSlideIn_0.3s_ease-out]">
                <div className="relative">
                  <div className={iconWrap}><User className="w-5 h-5" /></div>
                  <select name="category" value={formData.category} onChange={handleChange} className={selectClass('category')}>
                    <option value="">Select Category</option>
                    <option value="Master">Master</option>
                    <option value="Student">Student</option>
                  </select>
                  {errors.category && <p className={errCss}><AlertCircle className="w-3.5 h-3.5" />{errors.category}</p>}
                </div>
                <div className="relative">
                  <div className={iconWrap}><User className="w-5 h-5" /></div>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className={inputClass('name')} />
                  {errors.name && <p className={errCss}><AlertCircle className="w-3.5 h-3.5" />{errors.name}</p>}
                </div>
                <div className="relative">
                  <div className={iconWrap}><User className="w-5 h-5" /></div>
                  <input type="text" name="father_name" value={formData.father_name} onChange={handleChange} placeholder="Father's Name" className={inputClass('father_name')} />
                  {errors.father_name && <p className={errCss}><AlertCircle className="w-3.5 h-3.5" />{errors.father_name}</p>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 animate-[fadeSlideIn_0.3s_ease-out]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className={iconWrap}><Phone className="w-5 h-5" /></div>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" maxLength={10} className={inputClass('phone')} />
                    {errors.phone && <p className={errCss}><AlertCircle className="w-3.5 h-3.5" />{errors.phone}</p>}
                  </div>
                  <div className="relative">
                    <div className={iconWrap}><Hash className="w-5 h-5" /></div>
                    <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className={inputClass('age')} />
                    {errors.age && <p className={errCss}><AlertCircle className="w-3.5 h-3.5" />{errors.age}</p>}
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute left-3.5 top-3.5 text-gray-400 pointer-events-none"><MapPin className="w-5 h-5" /></div>
                  <textarea name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Complete Address" className={textareaClass('address')} />
                  {errors.address && <p className={errCss}><AlertCircle className="w-3.5 h-3.5" />{errors.address}</p>}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className={iconWrap}><Building2 className="w-5 h-5" /></div>
                    <input type="text" name="district" value={formData.district} onChange={handleChange} placeholder="District" className={inputClass('district')} />
                    {errors.district && <p className={errCss}><AlertCircle className="w-3.5 h-3.5" />{errors.district}</p>}
                  </div>
                  <div className="relative">
                    <div className={iconWrap}><Landmark className="w-5 h-5" /></div>
                    <select name="state" value={formData.state} onChange={handleChange} className={selectClass('state')}>
                      <option value="">Select State</option>
                      {indianStates.map((st) => <option key={st} value={st}>{st}</option>)}
                    </select>
                    {errors.state && <p className={errCss}><AlertCircle className="w-3.5 h-3.5" />{errors.state}</p>}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5 animate-[fadeSlideIn_0.3s_ease-out]">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-maroon-500/20 to-amber-500/20 rounded-2xl blur opacity-50 group-hover:opacity-70 transition duration-300" />
                  <div className="relative bg-gradient-to-br from-maroon-50 to-amber-50/50 backdrop-blur-sm rounded-2xl p-5 border border-maroon-100/50">
                    <div className="text-center mb-3">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-maroon-100 mb-2"><CreditCard className="w-6 h-6 text-maroon-600" /></div>
                      <h3 className="text-lg font-bold text-maroon-800">Scan & Pay</h3>
                      <p className="text-xs text-maroon-500 mt-1">Scan this QR code using any UPI app</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="bg-white rounded-2xl p-4 shadow-inner border border-maroon-100/50 max-w-[200px] w-full">
                        <img src={qrCodeImage} alt="UPI QR Code for Payment" className="w-full h-auto rounded-xl" />
                      </div>
                    </div>
                    <div className="mt-3 text-center">
                      <p className="text-[10px] text-maroon-400 leading-relaxed">After payment, enter your UPI ID and upload the payment screenshot below</p>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className={iconWrap}><Wallet className="w-5 h-5" /></div>
                  <input type="text" name="upi_id" value={formData.upi_id} onChange={handleChange} placeholder="UPI ID (e.g. example@paytm)" className={inputClass('upi_id')} />
                  {errors.upi_id && <p className={errCss}><AlertCircle className="w-3.5 h-3.5" />{errors.upi_id}</p>}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Upload Payment Screenshot *</p>
                  <div onClick={() => fileRef.current?.click()} className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-6 transition-all duration-300 group ${preview ? 'border-green-300 bg-green-50/50' : errors.payment_screenshot ? 'border-red-300 bg-red-50/30' : 'border-gray-200 hover:border-maroon-300 hover:bg-maroon-50/30'}`}>
                    {preview ? (
                      <div className="space-y-3">
                        <div className="relative inline-block mx-auto">
                          <img src={preview} alt="Preview" className="max-h-36 mx-auto rounded-xl shadow-md object-cover" />
                          <button type="button" onClick={(e) => { e.stopPropagation(); removeScreenshot(); }} className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors"><X className="w-4 h-4" /></button>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                          <p className="text-sm text-green-600 font-medium">Screenshot uploaded successfully</p>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-maroon-100 to-amber-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"><Image className="w-7 h-7 text-maroon-500" /></div>
                        <p className="text-gray-700 font-medium text-sm">Click to upload screenshot</p>
                        <p className="text-xs text-gray-400 mt-1">JPG, JPEG, PNG (Max 10MB)</p>
                      </div>
                    )}
                    <input ref={fileRef} type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="hidden" />
                  </div>
                  {errors.payment_screenshot && <p className={errCss}><AlertCircle className="w-3.5 h-3.5" />{errors.payment_screenshot}</p>}
                </div>
                <div className="bg-gradient-to-br from-amber-50 to-maroon-50 rounded-xl p-4 border border-amber-100/50">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5"><ArrowRight className="w-4 h-4 text-amber-600" /></div>
                    <div>
                      <p className="text-xs font-semibold text-amber-800">Payment Instructions</p>
                      <p className="text-xs text-amber-700/70 mt-1 leading-relaxed">1. Scan the QR code using any UPI app<br />2. Complete the payment<br />3. Enter your UPI ID above<br />4. Upload the payment screenshot</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              {step > 1 && (
                <button type="button" onClick={goBack} className="flex-1 sm:flex-none sm:px-6 py-3.5 rounded-xl font-semibold border-2 border-gray-200 text-gray-600 hover:border-maroon-300 hover:text-maroon-600 transition-all duration-200 flex items-center justify-center gap-2 text-sm">
                  <ChevronLeft className="w-4 h-4" /><span className="hidden sm:inline">Previous</span><span className="sm:hidden">Back</span>
                </button>
              )}
              {step < TOTAL_STEPS && (
                <button type="button" onClick={goNext} className="flex-1 bg-gradient-to-r from-maroon-700 to-maroon-800 text-white py-3.5 rounded-xl font-bold text-sm hover:from-maroon-800 hover:to-maroon-900 transition-all shadow-lg shadow-maroon-200/50 flex items-center justify-center gap-2">
                  <span>Next</span><ChevronRight className="w-4 h-4" />
                </button>
              )}
              {step === TOTAL_STEPS && (
                <button type="submit" disabled={loading} className="flex-1 bg-gradient-to-r from-maroon-700 to-amber-700 text-white py-3.5 rounded-xl font-bold text-sm hover:from-maroon-800 hover:to-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-maroon-200/50 flex items-center justify-center gap-2">
                  {loading ? <><span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /><span>Submitting...</span></> : <><CheckCircle className="w-5 h-5" /><span>Submit</span></>}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <style>{`@keyframes fadeSlideIn{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}`}</style>
    </div>
  );
};

export default Registration;