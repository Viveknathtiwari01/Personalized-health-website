"use client";
import { useUser } from '@clerk/nextjs';
import { useEffect, useState, useRef } from 'react';
import { FaUser, FaVenusMars, FaBirthdayCake, FaWeight, FaRulerVertical, FaAllergies, FaBullseye, FaLeaf, FaHome, FaCamera, FaUpload, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import Link from 'next/link';

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState({
    name: '',
    sex: '',
    age: '',
    weight: '',
    height: '',
    issues: '',
    motive: '',
    goal: '',
    diet: '',
    imageUrl: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [imageMessage, setImageMessage] = useState('');
  const [shouldRegenerateMeals, setShouldRegenerateMeals] = useState(false);
  const [shouldRegenerateWorkouts, setShouldRegenerateWorkouts] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch('/api/profile')
      .then(res => {
        if (res.status === 404) return null;
        return res.json();
      })
      .then(data => {
        if (!data) {
          setProfile({
            name: '', sex: '', age: '', weight: '', height: '', issues: '', motive: '', goal: '', diet: '', imageUrl: ''
          });
        } else {
          setProfile({
            name: data.name || '',
            sex: data.sex || '',
            age: data.age?.toString() || '',
            weight: data.weight?.toString() || '',
            height: data.height?.toString() || '',
            issues: data.issues || '',
            motive: data.motive || '',
            goal: data.goal || '',
            diet: data.diet || '',
            imageUrl: data.imageUrl || ''
          });
          if (data.imageUrl) {
            setImagePreview(data.imageUrl);
          }
        }
        setLoading(false);
      });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setImageMessage('Image file is too large. Please select an image smaller than 5MB.');
        setTimeout(() => setImageMessage(''), 5000);
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setImageMessage('Please select a valid image file.');
        setTimeout(() => setImageMessage(''), 5000);
        return;
      }
      
      setImageUploading(true);
      
      // Compress the image before converting to base64
      const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const img = new Image();
          
          img.onload = () => {
            // Calculate new dimensions (max 300x300 for profile image)
            const maxSize = 300;
            let { width, height } = img;
            
            if (width > height) {
              if (width > maxSize) {
                height = (height * maxSize) / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width = (width * maxSize) / height;
                height = maxSize;
              }
            }
            
            canvas.width = width;
            canvas.height = height;
            
            // Draw and compress
            ctx?.drawImage(img, 0, 0, width, height);
            const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8); // 80% quality
            resolve(compressedDataUrl);
          };
          
          img.src = URL.createObjectURL(file);
        });
      };
      
      try {
        const compressedImage = await compressImage(file);
        setImagePreview(compressedImage);
        
        // Create a complete profile object with the new image
        const updatedProfile = {
          ...profile,
          imageUrl: compressedImage
        };
        
        setProfile(updatedProfile);
        
        // Auto-save the profile with the new image
        try {
          console.log('Sending profile data for image update:', updatedProfile);
          console.log('Image data length:', compressedImage.length);
          const res = await fetch('/api/profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProfile),
          });
          
          console.log('Response status:', res.status);
          console.log('Response headers:', Object.fromEntries(res.headers.entries()));
          
          const responseText = await res.text();
          console.log('Response text:', responseText);
          console.log('Response text length:', responseText.length);
          console.log('Response is empty:', responseText === '');
          
          if (res.ok) {
            let result;
            try {
              result = JSON.parse(responseText);
              console.log('Parsed result:', result);
            } catch (e) {
              console.error('Failed to parse response as JSON:', e);
              setImageMessage('Invalid response from server');
              setTimeout(() => setImageMessage(''), 5000);
              setImageUploading(false);
              return;
            }
            
            // Check if the result is empty or has no meaningful data
            if (!result || Object.keys(result).length === 0) {
              console.log('Empty result received, treating as error');
              setImageMessage('Server returned empty response');
              setTimeout(() => setImageMessage(''), 5000);
              setImageUploading(false);
              return;
            }
            
            setImageMessage('Profile image updated successfully!');
            
            // Auto-dismiss the message after 3 seconds
            setTimeout(() => setImageMessage(''), 3000);
            
            // Check if plans should be regenerated
            if (result.shouldRegenerateMeals) {
              setShouldRegenerateMeals(true);
            }
            if (result.shouldRegenerateWorkouts) {
              setShouldRegenerateWorkouts(true);
            }
          } else {
            let errorData;
            try {
              errorData = JSON.parse(responseText);
            } catch (e) {
              errorData = { error: 'Invalid error response' };
            }
            console.error('Profile update error:', errorData);
            setImageMessage(`Error updating profile image: ${errorData.error || `HTTP ${res.status}`}`);
            setTimeout(() => setImageMessage(''), 5000);
          }
        } catch (error) {
          console.error('Error saving profile image:', error);
          setImageMessage('Network error updating profile image.');
          setTimeout(() => setImageMessage(''), 5000);
        }
        
        setImageUploading(false);
      } catch (error) {
        console.error('Error compressing image:', error);
        setImageMessage('Error compressing image.');
        setTimeout(() => setImageMessage(''), 5000);
        setImageUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setShouldRegenerateMeals(false);
    setShouldRegenerateWorkouts(false);
    
    try {
      console.log('Sending profile data for form update:', profile);
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      
      console.log('Response status:', res.status);
      console.log('Response headers:', Object.fromEntries(res.headers.entries()));
      
      const responseText = await res.text();
      console.log('Response text:', responseText);
      console.log('Response text length:', responseText.length);
      console.log('Response is empty:', responseText === '');
      
      if (res.ok) {
        let result;
        try {
          result = JSON.parse(responseText);
          console.log('Parsed result:', result);
        } catch (e) {
          console.error('Failed to parse response as JSON:', e);
          setMessage('Invalid response from server');
          setSaving(false);
          return;
        }
        
        // Check if the result is empty or has no meaningful data
        if (!result || Object.keys(result).length === 0) {
          console.log('Empty result received, treating as error');
          setMessage('Server returned empty response');
          setSaving(false);
          return;
        }
        
        setMessage('Profile updated successfully!');
        setIsEditing(false);
        
        // Check if plans should be regenerated
        if (result.shouldRegenerateMeals) {
          setShouldRegenerateMeals(true);
        }
        if (result.shouldRegenerateWorkouts) {
          setShouldRegenerateWorkouts(true);
        }
      } else {
        let errorData;
        try {
          errorData = JSON.parse(responseText);
        } catch (e) {
          errorData = { error: 'Invalid error response' };
        }
        console.error('Profile update error:', errorData);
        setMessage(`Error updating profile: ${errorData.error || `HTTP ${res.status}`}`);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Network error updating profile.');
    }
    
    setSaving(false);
  };

  if (!user) return (
    <section className="container mx-auto px-4 py-12 max-w-xl bg-gradient-to-br from-purple-100 via-slate-100 to-emerald-100 rounded-2xl shadow-lg animate-fade-in">
      <h1 className="text-4xl font-bold text-emerald-700 mb-6">Profile</h1>
      <div className="bg-white/70 backdrop-blur-md rounded-xl shadow p-6 text-center text-slate-500">You must be logged in to view your profile.</div>
    </section>
  );

  return (
    <section className="container mx-auto px-4 py-12 bg-gradient-to-br from-purple-100 via-slate-100 to-emerald-100 rounded-2xl shadow-lg animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold text-emerald-700 drop-shadow-lg">Profile</h1>
        <Link href="/dashboard" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2">
          <FaHome className="text-lg" />
          Dashboard
        </Link>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Image Section */}
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100 animate-slide-in-left">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-200 shadow-lg image-upload-hover">
                  {imageUploading ? (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-purple-500 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                    </div>
                  ) : imagePreview ? (
                    <img 
                      src={imagePreview} 
                      alt="Profile" 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-purple-500 flex items-center justify-center">
                      <FaUser className="text-white text-4xl" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-gradient-to-r from-emerald-500 to-purple-500 text-white p-3 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Upload Profile Picture"
                  disabled={imageUploading}
                >
                  {imageUploading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  ) : (
                    <FaCamera className="text-lg" />
                  )}
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <h3 className="text-xl font-bold text-slate-800 mb-2 animate-fade-in">{profile.name || 'Your Name'}</h3>
              <p className="text-slate-600 mb-4">
                {imageUploading ? 'Uploading image...' : 'Fitness Enthusiast'}
              </p>
              
              {/* Image Upload Message */}
              {imageMessage && (
                <div className="mb-4 text-center font-semibold animate-fade-in text-emerald-700 bg-emerald-100 rounded-xl p-3 shadow">
                  {imageMessage}
                </div>
              )}
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold px-6 py-2 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2 mx-auto animate-scale-in"
              >
                {isEditing ? <FaTimes /> : <FaEdit />}
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>

        {/* Profile Details & Form */}
        <div className="lg:col-span-2">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-gray-100 animate-slide-in-right">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-emerald-500 to-purple-500 p-3 rounded-full animate-scale-in">
                <FaUser className="text-white text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Profile Information</h2>
            </div>
            
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                <p className="text-slate-600">Loading profile...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <label className="block font-semibold mb-2 text-slate-700">Name</label>
                    <div className="relative">
                      <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input 
                        name="name" 
                        value={profile.name} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-50 disabled:text-gray-500" 
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block font-semibold mb-2 text-slate-700">Sex</label>
                    <div className="relative">
                      <FaVenusMars className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <select 
                        name="sex" 
                        value={profile.sex} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block font-semibold mb-2 text-slate-700">Age</label>
                    <div className="relative">
                      <FaBirthdayCake className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input 
                        name="age" 
                        type="number" 
                        value={profile.age} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-50 disabled:text-gray-500" 
                        placeholder="Enter your age"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block font-semibold mb-2 text-slate-700">Weight (kg)</label>
                    <div className="relative">
                      <FaWeight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input 
                        name="weight" 
                        type="number" 
                        value={profile.weight} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-50 disabled:text-gray-500" 
                        placeholder="Enter your weight"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block font-semibold mb-2 text-slate-700">Height (cm)</label>
                    <div className="relative">
                      <FaRulerVertical className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <input 
                        name="height" 
                        type="number" 
                        value={profile.height} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-50 disabled:text-gray-500" 
                        placeholder="Enter your height"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="block font-semibold mb-2 text-slate-700">Diet Preference</label>
                    <div className="relative">
                      <FaLeaf className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                      <select 
                        name="diet" 
                        value={profile.diet} 
                        onChange={handleChange}
                        disabled={!isEditing}
                        className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-50 disabled:text-gray-500"
                      >
                        <option value="">Select diet</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="non-vegetarian">Non-Vegetarian</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="relative">
                  <label className="block font-semibold mb-2 text-slate-700">Any Issues/Allergies</label>
                  <div className="relative">
                    <FaAllergies className="absolute left-3 top-3 text-slate-400" />
                    <input 
                      name="issues" 
                      value={profile.issues} 
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-50 disabled:text-gray-500" 
                      placeholder="Any health issues or allergies"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block font-semibold mb-2 text-slate-700">Fitness Goal/Motive</label>
                  <div className="relative">
                    <FaBullseye className="absolute left-3 top-3 text-slate-400" />
                    <input 
                      name="motive" 
                      value={profile.motive} 
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-50 disabled:text-gray-500" 
                      placeholder="What's your fitness goal?"
                    />
                  </div>
                </div>

                <div className="relative">
                  <label className="block font-semibold mb-2 text-slate-700">Additional Goal (Optional)</label>
                  <div className="relative">
                    <FaBullseye className="absolute left-3 top-3 text-slate-400" />
                    <input 
                      name="goal" 
                      value={profile.goal} 
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full border border-gray-200 rounded-xl px-10 py-3 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-gray-50 disabled:text-gray-500" 
                      placeholder="Any additional goals"
                    />
                  </div>
                </div>

                {isEditing && (
                  <button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-500 to-purple-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2" 
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <FaSave />
                        <span>Save Profile</span>
                      </>
                    )}
                  </button>
                )}
                
                {message && (
                  <div className="mt-4 text-center font-semibold animate-fade-in text-emerald-700 bg-emerald-100 rounded-xl p-3 shadow">
                    {message}
                  </div>
                )}
                
                {/* Regeneration Notifications */}
                {(shouldRegenerateMeals || shouldRegenerateWorkouts) && (
                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-slate-600 bg-blue-50 border border-blue-200 rounded-xl p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Profile Updated Successfully!</h4>
                      <p className="text-blue-700 mb-2">Your profile changes may affect your personalized plans. Consider regenerating:</p>
                      <div className="space-y-1">
                        {shouldRegenerateMeals && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <Link href="/meals" className="text-emerald-600 hover:text-emerald-800 underline">Regenerate Meal Plan</Link>
                          </div>
                        )}
                        {shouldRegenerateWorkouts && (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                            <Link href="/workouts" className="text-indigo-600 hover:text-indigo-800 underline">Regenerate Workout Plan</Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 