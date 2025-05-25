import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, RefreshCw, Plus, Pencil, Trash2, Copy } from 'lucide-react';

const TABS = ['Active', 'Drafts', 'Orders'];

const CATEGORIES_SUMMARY = [
  { name: 'Grains', count: 28, color: '#FACC15', bg: '#FEF9C3' },
  { name: 'Vegetable', count: 35, color: '#16A34A', bg: '#D1FAE5' },
  { name: 'Root Crops', count: 41, color: '#F97316', bg: '#FFEDD5' },
  { name: 'Milks & Dairy', count: 51, color: '#3B82F6', bg: '#EFF6FF' },
  { name: 'Meats', count: 60, color: '#DC2626', bg: '#FEE2E2' },
  { name: 'Fruits', count: 75, color: '#7C3AED', bg: '#F3E8FF' },
];

const SELLER_PRODUCTS = [
  { id: 1, name: 'Corn', variation: 'Yellow, White', avatar: '/Screenshot_195.png', price: 12999, stock: 25, category: 'Grains', status: 'Pending' },
  { id: 2, name: 'Corn', variation: 'Yellow, White', avatar: '/Screenshot_195.png', price: 12999, stock: 25, category: 'Grains', status: 'Pending' },
  { id: 3, name: 'Corn', variation: 'Yellow, White', avatar: '/Screenshot_195.png', price: 12999, stock: 25, category: 'Grains', status: 'Pending' },
  { id: 4, name: "Train Your Dragon's Treasure Exotic Fruit", variation: 'Yellow, White', avatar: '/Screenshot_195.png', price: 12999, stock: 25, category: 'Milks & Dairy', status: 'Draft' },
  { id: 5, name: "Train Your Dragon's Treasure Exotic Fruit", variation: 'Yellow, White', avatar: '/Screenshot_195.png', price: 12999, stock: 25, category: 'Milks & Dairy', status: 'Draft' }
];

const BADGE_STYLES = {
  Fruits: { color: '#7C3AED', background: '#F3E8FF', border: '#7C3AED' },
  'Milks & Dairy': { color: '#3B82F6', background: '#EFF6FF', border: '#3B82F6' },
  Vegetable: { color: '#16A34A', background: '#D1FAE5', border: '#16A34A' },
  Grains: { color: '#FACC15', background: '#FEF9C3', border: '#FACC15' },
  'Root Crops': { color: '#F97316', background: '#FFEDD5', border: '#F97316' },
  Meats: { color: '#DC2626', background: '#FEE2E2', border: '#DC2626' },
};

const STATUS_STYLES = {
  Pending: { color: '#92400E', background: '#FEF3C7', border: '#92400E' },
  Draft: { color: '#92400E', background: '#FEF3C7', border: '#92400E' },
};

const SellerCenter = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const tabsRef = useRef();
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  const updateIndicator = useCallback(() => {
    const container = tabsRef.current;
    const idx = TABS.indexOf(activeTab);
    const btn = tabRefs.current[idx];
    if (container && btn) {
      const c = container.getBoundingClientRect();
      const b = btn.getBoundingClientRect();
      setIndicator({ left: b.left - c.left + container.scrollLeft, width: b.width });
    }
  }, [activeTab]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const filtered = SELLER_PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeTab === 'Active' ? p.status === 'Pending' : activeTab === 'Drafts' ? p.status === 'Draft' : true)
  );

  const toggleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === filtered.length ? [] : filtered.map(p => p.id)
    );
  };

  const toggleRow = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="p-0">
      <div className="sticky top-0 z-30 w-full bg-[#f9fbf8] shadow-sm">
        <div className="px-6 pb-4 pt-6">
        <h1 className="text-4xl font-extrabold font-inter text-gray-800">Product Management</h1>
          <ul ref={tabsRef} className="flex mt-4 border-b relative">
            {TABS.map((t, i) => (
              <li key={t} className="mr-10">
                <button
                  ref={el => (tabRefs.current[i] = el)}
                  onClick={() => setActiveTab(t)}
                  className={`pb-3 text-lg font-semibold w-44 ${activeTab === t ? 'text-green-600' : 'text-gray-400'}`}
                >{t}</button>
              </li>
            ))}
            <div
              className="absolute bottom-0 h-[3px] bg-green-600 transition-all duration-300"
              style={{ left: indicator.left, width: indicator.width }}
            />
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2 text-gray-700">
          <RefreshCw size={20} className="text-[#4CAE4F] w-6 h-6" />
          <span className="text-xl font-bold font-inter text-black">{activeTab} Products ({filtered.length})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-[270px]">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black" />
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search Product"
            className="flex items-center border-2 border-black rounded-full pl-10 px-3 py-1 w-full max-w-md h-10"/>
            <SlidersHorizontal size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black" />
          </div>
          <button className="flex items-center gap-2 bg-[#4CAE4F] text-white font-medium text-base px-6 py-2 h-10 rounded-full">
            <Plus size={16} /> Add Product
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto px-6 pb-4">
        {CATEGORIES_SUMMARY.map(cat => (
          <div key={cat.name} className="text-xl relative bg-white border border-gray-300 rounded-2xl flex flex-col justify-center h-[80px] w-[150px] shadow-sm">
            <div className="absolute left-0 top-0 h-full w-3 rounded-tl-3xl rounded-bl-3xl" style={{ backgroundColor: cat.bg }} />
            <div className="pl-4">
              <p className="text-lg text-gray-400 font-semibold pt-2">{cat.name}</p>
              <p className="text-2xl font-bold">{cat.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6">
        <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden">
          <thead className="bg-[#F9F9F9] text-black text-lg rounded-full">
            <tr>
              <th className="p-4"><input type="checkbox" checked={selectedRows.length === filtered.length} onChange={toggleSelectAll} className="w-5 h-5"/></th>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Category</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => {
              const catStyle = BADGE_STYLES[p.category] || BADGE_STYLES['Grains'];
              const statStyle = STATUS_STYLES[p.status] || STATUS_STYLES['Pending'];
              return (
                <tr key={p.id} className={`border-t ${selectedRows.includes(p.id) ? 'bg-[#F0FDFA]' : ''}`}>
                  <td className="p-4"><input type="checkbox" checked={selectedRows.includes(p.id)} onChange={() => toggleRow(p.id)} className="w-5 h-5" /></td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <div className="font-semibold text-lg">{p.name}</div>
                        <div className="text-base text-gray-800">Variation: {p.variation}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-lg">₱{p.price.toLocaleString()}</td>
                  <td className="p-3">
                    <span className="text-base font-medium border px-4 py-1 rounded-full" style={{ color: catStyle.color, backgroundColor: catStyle.background, border: `1px solid ${catStyle.border}` }}>{p.category}</span>
                  </td>
                  <td className="p-4 text-lg font-bold">{p.stock}</td>
                  <td className="p-3">
                    <span className="text-base font-medium border px-4 py-1 rounded-full" style={{ color: statStyle.color, backgroundColor: statStyle.background, border: `1px solid ${statStyle.border}` }}>{p.status}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <Pencil size={25} className="text-blue-600 cursor-pointer hover:scale-110 transition" />
                      <Trash2 size={25} className="text-red-500 cursor-pointer hover:scale-110 transition" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-1">
            <button className="px-3 py-1 rounded-lg text-lg text-gray-600 hover:bg-gray-200">«</button>
            {[1, 2, 3, 4, 5].map(n => (
              <button key={n} className={`px-3 py-1 rounded-lg text-lg ${n === 1 ? 'bg-gray-300 text-black' : 'text-gray-600 hover:bg-gray-100'}`}>{n}</button>
            ))}
            <button className="px-3 py-1 rounded-lg text-lg text-gray-600 hover:bg-gray-200">»</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerCenter;
