import os
import glob

admin_dir = r"d:\Bisnis\Rakira Digital\Client\WMU\resources\js\Pages\Admin"
jsx_files = glob.glob(os.path.join(admin_dir, '**', '*.jsx'), recursive=True)

replacements = [
    # Card Wrapper
    (r'bg-white overflow-hidden shadow-sm sm:rounded-lg', 
     r'bg-white overflow-hidden shadow-sm border border-gray-100 sm:rounded-2xl'),
    (r'p-6 bg-white border-b border-gray-200', 
     r'p-6 sm:p-8 bg-white'),
    
    # Tables
    (r'min-w-full divide-y divide-gray-200', 
     r'min-w-full divide-y divide-gray-100'),
    (r'bg-white divide-y divide-gray-200', 
     r'bg-white divide-y divide-gray-50'),
    (r'<th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"', 
     r'<th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100"'),
    (r'<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"', 
     r'<th className="px-6 py-4 bg-gray-50/50 text-left text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100"'),
    (r'<th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"', 
     r'<th className="px-6 py-4 bg-gray-50/50 text-right text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-100"'),
    (r'<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"', 
     r'<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"'),
    (r'<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500', 
     r'<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600'),
    (r'<tr key={', r'<tr className="hover:bg-gray-50/80 transition-colors duration-150 group" key={'),
    
    # Inputs
    (r'rounded-md border-gray-300 shadow-sm focus:border-wmu-dark focus:ring-wmu-dark', 
     r'rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200'),
    (r'rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500', 
     r'rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200'),
    
    # Labels
    (r'block text-sm font-medium text-gray-700', 
     r'block text-sm font-semibold text-gray-700 mb-1'),
    
    # Buttons
    (r'bg-wmu-dark hover:bg-gray-800 text-white font-bold py-2 px-4 rounded', 
     r'inline-flex items-center justify-center rounded-xl bg-wmu-dark px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200'),
    (r'bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded', 
     r'inline-flex items-center justify-center rounded-xl bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-all duration-200'),
    (r'bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded', 
     r'inline-flex items-center justify-center rounded-xl bg-wmu-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-600 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200'),
    (r'bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded', 
     r'inline-flex items-center justify-center rounded-xl bg-red-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 hover:shadow-md transition-all duration-200'),
    
    # Modal Wrapper
    (r'bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full', 
     r'bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all sm:max-w-lg sm:w-full border border-gray-100'),
    (r'bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full', 
     r'bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all sm:max-w-2xl sm:w-full border border-gray-100'),
    (r'bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-3xl sm:w-full', 
     r'bg-white rounded-2xl overflow-hidden shadow-2xl transform transition-all sm:max-w-3xl sm:w-full border border-gray-100'),
    
    # Table action buttons
    (r'text-blue-600 hover:text-blue-900 mr-4', r'text-blue-600 hover:text-blue-800 font-semibold transition-colors mr-4'),
    (r'text-red-600 hover:text-red-900', r'text-red-500 hover:text-red-700 font-semibold transition-colors'),
    
    # Textareas
    (r'shadow-sm focus:ring-wmu-dark focus:border-wmu-dark mt-1 block w-full sm:text-sm border border-gray-300 rounded-md',
     r'mt-1 block w-full rounded-xl border-gray-200 bg-gray-50 focus:bg-white focus:border-wmu-accent focus:ring-wmu-accent transition-all duration-200 sm:text-sm'),
]

for file_path in jsx_files:
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for old, new in replacements:
        content = content.replace(old, new)
        
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated {file_path}")
