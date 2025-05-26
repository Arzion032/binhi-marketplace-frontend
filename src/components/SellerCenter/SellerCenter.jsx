import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Search, SlidersHorizontal, RefreshCw, Plus, Pencil, Trash2 } from 'lucide-react';
import SideBar from '../SideBar';

 /*pahguhd*/

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

const getTabDisplay = (tab) => {
  if (tab === 'Active' || tab === 'Drafts') return 'Product Management';
  if (tab === 'Orders') return 'Order Management';
  return tab;
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
    <div className="flex">
      {/* Sidebar on the left */}
      <SideBar />

      {/* Main content shifted to the right */}
      <div className="ml-64 w-full min-h-screen" style={{ background: '#F7F8FA' }}>
        {/* Sticky header & Marketplace-style Breadcrumb + Title */}
        <div className="sticky top-0 z-30 w-full bg-[#f9fbf8] shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div className="text-sm breadcrumbs font-inter text-base">
              <ul className="flex gap-1">
                <li>
                  <a className="text-green-600 underline">Dashboard</a>
                </li>
                <li>
                  <a className="text-green-600 underline">Marketplace</a>
                </li>
                <li className="text-gray-400">{getTabDisplay(activeTab)}</li>
              </ul>
            </div>
            <button className="btn btn-square btn-binhi ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h.01M12 12h.01M19 12h.01"
                />
              </svg>
            </button>
          </div>
          <div className="px-6 pb-4 h-5 flex items-center">
            <h1 className="text-[40px] font-bold text-gray-800">Product Management</h1>
          </div>
          <div className="mb-4 border-b border-gray-200 relative">
            <ul
              ref={tabsRef}
              className="flex -mb-px text-sm font-medium text-center"
              role="tablist"
            >
              {TABS.map((t, i) => (
                <li key={t} className="mr-10" role="presentation">
                  <button
                    ref={el => (tabRefs.current[i] = el)}
                    onClick={() => setActiveTab(t)}
                    className={`inline-block p-4 ${
                      activeTab === t
                        ? 'text-green-600'
                        : 'text-gray-500 hover:text-gray-600'
                    }`}
                    role="tab"
                    aria-selected={activeTab === t}
                  >
                    {t}
                  </button>
                </li>
              ))}
            </ul>
            <div
              className="absolute bottom-0 h-0.5 bg-green-600 transition-all duration-300"
              style={{ left: indicator.left, width: indicator.width }}
            />
          </div>
        </div>

        {/* Toolbar: search, actions */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* LEFT: Selection actions */}
          {selectedRows.length > 0 ? (
            <div className="flex items-center gap-2">
              <button
                className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50"
                style={{ color: "#dc2626" }}
              >
                <Trash2 size={18} stroke="#dc2626" />
                Delete
                <span className="text-gray-500 ml-1">
                  {selectedRows.length} Selected
                </span>
              </button>
              <button
                onClick={() => setSelectedRows([])}
                className="flex items-center gap-1 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-gray-100"
              >
                ✕ Clear
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2" style={{ color: "#374151" }}>
              <RefreshCw size={20} style={{ color: "#16A34A" }} />
              <span style={{ fontWeight: 500 }}>
                {activeTab === "Active"
                  ? `All Products ${filtered.length}`
                  : activeTab === "Drafts"
                  ? `All Drafts ${filtered.length}`
                  : activeTab === "Orders"
                  ? `All Orders ${filtered.length}`
                  : ""}
              </span>
            </div>
          )}

          {/* RIGHT: Search, filter, add */}
          <div className="flex items-center gap-4">
            <div className="relative" style={{ width: "240px" }}>
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6B7280",
                }}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Product"
                style={{
                  width: "100%",
                  padding: "0.5rem 2.5rem 0.5rem 2.5rem",
                  border: "1px solid #D1D5DB",
                  borderRadius: "9999px",
                  outline: "none",
                }}
              />
              <SlidersHorizontal
                size={18}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6B7280",
                  cursor: "pointer"
                }}
              />
            </div>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1.2rem",
                backgroundColor: "#16A34A",
                color: "#fff",
                border: "none",
                borderRadius: "9999px",
                fontWeight: 600,
                fontSize: "1rem",
                cursor: "pointer",
                boxShadow: "0 2px 8px 0 rgba(36,185,111,0.05)"
              }}
            >
              <Plus size={18} /> Add Product
            </button>
          </div>
        </div>

        {/* Category Summary Cards */}
        {["Active", "Drafts"].includes(activeTab) && (
        <div className="px-6 pb-4">
          <div className="flex gap-4 overflow-x-auto">
            {CATEGORIES_SUMMARY.map(cat => (
              <div
                key={cat.name}
                style={{
                  position: 'relative',
                  border: '1px solid #858585',
                  borderRadius: '1.6rem',
                  minWidth: '150px',
                  height: '80px',
                  padding: '0 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  backgroundColor: '#FFFFFF',
                  flex: '1',
                  overflow: 'hidden'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '0',
                    bottom: '0',
                    width: '20px',
                    backgroundColor: cat.bg,
                    borderRadius: '1.6rem 0 0 1.6rem'
                  }}
                />
                <span style={{ fontSize: '0.875rem', color: '#9CA3AF', fontWeight: 500, marginLeft: '8px' }}>{cat.name}</span>
                <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#000000', marginLeft: '8px' }}>{cat.count}</span>
              </div>
            ))}
          </div>
        </div>
        )}

        {/* Table */}
        <div className="px-6 pb-6">
          <div style={{ borderRadius: '1rem', overflow: 'hidden', minHeight: 420 }}>
            <h2 className="px-4 pt-4 text-xl font-bold text-gray-900">
              {["Active", "Drafts"].includes(activeTab)
                ? "Product List"
                : activeTab === "Orders"
                ? "Order List"
                : ""}
            </h2>
            {/* NO horizontal rule here! */}
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#F7F7FB' }}>
                <tr style={{ color: '#4B5563', fontSize: '0.875rem', fontWeight: 600 }}>
                  <th style={{ padding: '0.75rem' }}>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-sm rounded"
                      checked={selectedRows.length === filtered.length && filtered.length > 0}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Product</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Price</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Category</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Stock</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, idx) => {
                  const catStyle = BADGE_STYLES[p.category] || BADGE_STYLES['Grains'];
                  const statStyle = STATUS_STYLES[p.status] || STATUS_STYLES['Pending'];
                  const isSelected = selectedRows.includes(p.id);
                  const rowBg =
                    idx === 0
                      ? { backgroundColor: '#F7F7FB' }
                      : isSelected
                      ? { backgroundColor: '#F0FDFA' }
                      : {};
                  return (
                    <tr
                      key={p.id}
                      style={{
                        ...rowBg,
                        height: '49px'
                      }}>
                      <td style={{ padding: '0.75rem' }}>
                        <input
                          type="checkbox"
                          className="checkbox checkbox-sm rounded"
                          checked={isSelected}
                          onChange={() => toggleRow(p.id)}
                        />
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <img src={p.avatar} alt={p.name} style={{ width: 32, height: 32, borderRadius: '50%' }} />
                          <div>
                            <div style={{ fontWeight: 600, color: '#111827' }}>{p.name}</div>
                            <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                              Variation: {p.variation}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        ₱{Number(p.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderRadius: '9999px',
                            color: catStyle.color,
                            backgroundColor: catStyle.background,
                            border: `1px solid ${catStyle.border}`
                          }}
                        >
                          {p.category}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>{p.stock}</td>
                      <td style={{ padding: '0.75rem' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                            borderRadius: '9999px',
                            color: statStyle.color,
                            backgroundColor: statStyle.background,
                            border: `1px solid ${statStyle.border}`
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', minWidth: 120 }}>
                        <div className="group flex items-center gap-4">
                          <Pencil size={20} className="text-blue-600 cursor-pointer transition-transform duration-200 group-hover:-translate-y-1" />
                          <Trash2 size={20} className="text-red-500 cursor-pointer transition-transform duration-200 group-hover:translate-x-8" />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="flex justify-center my-6">
              <div className="flex items-center gap-1">
                <button className="btn btn-sm" style={{ color: "#757575" }}>«</button>
                {[1, 2, 3, 4, 5].map(n => (
                  <button key={n} className={`btn btn-sm ${n === 1 ? 'bg-gray-300 text-black' : 'btn-ghost text-gray-600'}`}>{n}</button>
                ))}
                <button className="btn btn-sm" style={{ color: "#757575" }}>»</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerCenter;
