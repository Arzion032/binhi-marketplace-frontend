import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search,
  SlidersHorizontal,
  RefreshCw,
  Plus,
  Pencil,
  Trash2
} from 'lucide-react';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import NotifModal from './NotifModal'; // <--- Import NotifModal

// --- Compact Data Arrays ---
const CATEGORIES_SUMMARY = [
  { name: 'Grains', count: 28, color: '#B79900', bg: '#FFF8D4' },
  { name: 'Vegetable', count: 35, color: '#16A34A', bg: '#D1FAE5' },
  { name: 'Root Crops', count: 41, color: '#F97316', bg: '#FFEDD5' },
  { name: 'Milks & Dairy', count: 51, color: '#3B82F6', bg: '#DDECFF' },
  { name: 'Meats', count: 60, color: '#DC2626', bg: '#FEE2E2' },
  { name: 'Fruits', count: 75, color: '#7C3AED', bg: '#F3E8FF' },
];
const BADGE_STYLES = Object.fromEntries(
  CATEGORIES_SUMMARY.map(cat => [cat.name, { color: cat.color, background: cat.bg, border: cat.color }])
);

const INITIAL_PRODUCTS = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: 'Corn',
  variation: 'Yellow, White',
  avatar: '/Screenshot_195.png',
  price: 12999,
  category: 'Grains',
  stock: 25,
  status: 'Pending'
}));

// EditModal Component
function EditModal({
  isOpen,
  onClose,
  product,
  onConfirm
}) {
  const categories = [
    "Fruits",
    "Milks & Dairy",
    "Vegetable",
    "Grains",
    "Root Crops",
    "Meats"
  ];
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [category, setCategory] = useState('');
  const [avatar, setAvatar] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (product && isOpen) {
      setName(product.name || "");
      setPrice(
        product.price !== undefined && product.price !== null
          ? Number(product.price).toLocaleString("en-PH", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })
          : ""
      );
      setStock(product.stock !== undefined ? String(product.stock) : "");
      setCategory(product.category || "");
      setAvatar(product.avatar || "");
      setError('');
    }
    if (!isOpen) setError('');
  }, [product, isOpen]);

  function handlePriceChange(e) {
    let val = e.target.value.replace(/[^\d.]/g, ""); // numbers and dots only
    if (val.split('.').length > 2) val = val.replace(/\.+$/, ''); // remove extra dots
    if (val.includes('.')) {
      const [intPart, decPart] = val.split('.');
      val = intPart + '.' + decPart.slice(0, 2);
    }
    let formatted = '';
    if (val) {
      let [intPart, decPart] = val.split('.');
      intPart = intPart ? String(Number(intPart)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '';
      formatted = decPart !== undefined ? `${intPart}.${decPart}` : intPart;
    }
    setPrice(formatted);
  }

  function handleStockChange(e) {
    let val = e.target.value.replace(/[^\d]/g, '');
    setStock(val);
  }

  function handleConfirm(e) {
    e.preventDefault();
    if (!name.trim() || !price.trim() || !stock.trim() || !category.trim()) {
      setError("Please fill out all required fields.");
      return;
    }
    setError('');
    onConfirm &&
      onConfirm({
        ...product,
        name,
        price: Number(String(price).replace(/,/g, "")),
        stock: Number(stock),
        category,
        avatar
      });
    onClose && onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <form
        className="relative bg-white w-full max-w-xl mx-auto rounded-[2.2rem] shadow-xl p-10 pt-9"
        style={{
          minWidth: 370,
          maxWidth: 490,
          border: '1px solid #858585'
        }}
        onSubmit={handleConfirm}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-8 top-7 text-gray-500 hover:text-gray-900 rounded-full focus:outline-none text-2xl"
          aria-label="Close"
        >
          <svg width={22} height={22} fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
        {/* Title */}
        <h2 className="text-2xl font-bold leading-tight mb-0">Edit Product</h2>
        <p className="text-base text-gray-600 mb-4">
          Please edit the product.
        </p>
        <hr className="mb-6 mt-1" />
        {/* Product Image & Name */}
        <div className="flex items-center gap-4 mb-7">
          <img
            src={avatar || "/Screenshot_195.png"}
            alt={name}
            className="rounded-full"
            style={{ width: 65, height: 65, objectFit: "cover" }}
          />
          <div>
            <div className="text-[1.3rem] font-bold text-[#222A35] leading-tight">{name}</div>
          </div>
        </div>
        {/* Inputs */}
        <div className="space-y-5">
          <div>
            <label className="font-semibold text-base mb-1 block">
              Product Name <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <input
              className="w-full px-6 py-3 rounded-2xl border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Product Name"
              required
              style={{
                color: '#222A35',
                background: "#fff"
              }}
            />
          </div>
          {/* Price and Stock side by side */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="font-semibold text-base mb-1 block">
                Price <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <div className="flex items-center relative">
                <span className="absolute left-6 text-gray-500 text-lg">₱</span>
                <input
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="0.00"
                  required
                  inputMode="decimal"
                  style={{
                    color: '#222A35',
                    background: "#fff"
                  }}
                />
              </div>
            </div>
            <div className="flex-1">
              <label className="font-semibold text-base mb-1 block">
                Stocks <span style={{ color: '#EF4444' }}>*</span>
              </label>
              <input
                className="w-full px-6 py-3 rounded-2xl border border-[#D1D5DB] focus:border-[#16A34A] focus:ring-2 focus:ring-[#16A34A] text-base"
                value={stock}
                onChange={handleStockChange}
                placeholder="0"
                required
                inputMode="numeric"
                style={{
                  color: '#222A35',
                  background: "#fff"
                }}
              />
            </div>
          </div>
          {/* Category */}
          <div>
            <label className="font-semibold text-base mb-1 block">
              Category <span style={{ color: '#EF4444' }}>*</span>
            </label>
            <select
              className="block w-full rounded-2xl border border-[#D1D5DB] px-6 py-3 text-base focus:border-[#16A34A] focus:outline-none"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
              style={{
                color: category ? '#222A35' : '#888',
                background: "#fff"
              }}
            >
              <option value="">Please select a category</option>
              {categories.map(cat => (
                <option value={cat} key={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {error && (
            <div className="text-red-500 text-base">{error}</div>
          )}
        </div>
        {/* Footer Buttons */}
        <div className="flex justify-between gap-4 mt-12">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-[#EF4444] text-white font-semibold rounded-full py-4 text-lg transition hover:bg-[#DC2626] focus:outline-none focus:ring-2 focus:ring-[#DC2626]"
            style={{ fontSize: "1.15rem" }}
          >
            Disregard
          </button>
          <button
            type="submit"
            className="flex-1 bg-[#16A34A] text-white font-semibold rounded-full py-4 text-lg transition hover:bg-[#15803D] focus:outline-none focus:ring-2 focus:ring-[#15803D]"
            style={{ fontSize: "1.15rem" }}
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}

export default function SellerCenter() {
  const tabs = ['Active', 'Drafts'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const tabsRef = useRef();
  const tabRefs = useRef([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const navigate = useNavigate();

  const [notifOpen, setNotifOpen] = useState(false); // <--- State for NotifModal

  const updateIndicator = useCallback(() => {
    const container = tabsRef.current;
    const idx = tabs.indexOf(activeTab);
    const btn = tabRefs.current[idx];
    if (container && btn) {
      const c = container.getBoundingClientRect();
      const b = btn.getBoundingClientRect();
      setIndicator({
        left: b.left - c.left + container.scrollLeft,
        width: b.width
      });
    }
  }, [activeTab]);
  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => { setCurrentPage(1); }, [searchQuery]);
  const handleDeleteSelected = () => {
    if (!window.confirm('Delete selected products?')) return;
    setProducts(prev => prev.filter(p => !selectedRows.includes(p.id)));
    setSelectedRows([]);
  };

  // Add/Edit modal handlers
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [categoryModalMode, setCategoryModalMode] = useState('add');

  // EDIT MODAL STATE (for the new EditModal)
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // Handle confirm (update) product
  const handleUpdateProduct = (updatedProduct) => {
    setProducts(prev =>
      prev.map(p => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditProduct(null);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  return (
    <div className="flex">
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 ml-64 bg-[#f9fbf8] min-h-screen">
        {/* --- Centered Back to Marketplace Button, with reduced space below --- */}
        <div className="flex justify-center mb-2 mt-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-black text-lg font-semibold border border-black rounded-full py-2 px-8 hover:text-green-700 transition"
          >
            <img src="/arrow-left.png" alt="Back" className="w-6 h-6" />
            Back to Marketplace
            <img src="/shop_black.png" alt="shop" className="w-6 h-6" />
          </button>
        </div>

        {/* Sticky header and tabs + bell + 3 dots */}
        <div className="sticky top-0 z-30 w-full bg-[#f9fbf8] shadow-sm">
          <div className="flex items-center justify-between px-6 py-3">
            <div></div>
            <div className="flex items-center gap-6">
              {/* Bell notification SVG */}
              <button className="relative" onClick={() => setNotifOpen(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bell"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                {/* Red dot for notifications */}
                <span className="absolute -top-1.5 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs flex items-center justify-center text-white font-bold">12</span>
              </button>
              {/* 3 dots vertical SVG */}
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28"
                  width="28"
                  viewBox="0 0 24 24"
                  fill="black"
                >
                  <circle cx="12" cy="5" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="12" cy="19" r="2" />
                </svg>
              </button>
            </div>
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
              {tabs.map((t, i) => (
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
        {/* Toolbar (search, actions) */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* LEFT: Selection actions */}
          {activeTab === "Active" && selectedRows.length > 0 ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDeleteSelected}
            className="flex items-center gap-2 border border-gray-200 rounded-2xl px-4 py-2 hover:bg-red-50 text-red-600 font-medium text-sm"
                style={{ color: "#dc2626" }}
              >
                <Trash2 size={18} stroke="#dc2626" />
                Delete
                <span className="text-gray-500 ml-1">{selectedRows.length} Selected</span>
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
                  ? `All Products ${products.length}`
                  : ""}
              </span>
            </div>
          )}
          {/* RIGHT: Search, filter, add categories */}
          {activeTab === "Active" && (
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
                  placeholder="Search Product"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
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
                  onClick={() => setShowFilters(f => !f)}
                  style={{
                    position: "absolute",
                    right: "0.75rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#6B7280",
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
                  boxShadow: "0 2px 8px 0 rgba(36,185,111,0.05)",
                }}
                onClick={() => {
                  setCategoryModalMode("add");
                  setShowAddCategory(true);
                }}
              >
                <Plus size={18} /> Add Category
              </button>
            </div>
          )}
        </div>
        {/* CATEGORY SUMMARY (Active only) */}
        {activeTab === "Active" && (
          <div className="px-6 pb-4">
            <div className="flex gap-4 overflow-x-auto">
              {CATEGORIES_SUMMARY.map(cat => {
                const style = BADGE_STYLES[cat.name] || BADGE_STYLES['Grains'];
                return (
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
                        backgroundColor: style.background,
                        borderRadius: '1.6rem 0 0 1.6rem'
                      }}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#9CA3AF', fontWeight: 500, marginLeft: '8px' }}>{cat.name}</span>
                    <span style={{ fontSize: '1.875rem', fontWeight: 900, color: '#000000', marginLeft: '8px' }}>{cat.count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* MAIN TABLE AREA */}
        <div className="px-6 pb-6">
          <div style={{ borderRadius: '1rem', overflow: 'hidden', minHeight: 420 }}>
            <h2 className="px-4 pt-4 text-xl font-bold text-gray-900">
              {activeTab === "Active" ? "Product List" : activeTab === "Drafts" ? "Drafts" : ""}
            </h2>
            {/* --- PRODUCT MANAGEMENT TABLE --- */}
            {activeTab === "Active" && (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#F7F7FB' }}>
                  <tr style={{ color: '#4B5563', fontSize: '0.875rem', fontWeight: 600 }}>
                    <th style={{ padding: '0.75rem' }}>
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm rounded"
                        checked={selectedRows.length === visibleProducts.length && visibleProducts.length > 0}
                        onChange={e =>
                          setSelectedRows(e.target.checked
                            ? visibleProducts.map(p => p.id)
                            : [])
                        }
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
                  {visibleProducts.map(p => {
                    const style = BADGE_STYLES[p.category] || BADGE_STYLES['Grains'];
                    const isSelected = selectedRows.includes(p.id);
                    return (
                      <tr
                        key={p.id}
                        style={{
                          backgroundColor: isSelected ? '#F0FDFA' : 'transparent',
                          height: '49px'
                        }}
                      >
                        <td style={{ padding: '0.75rem' }}>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-sm rounded"
                            checked={isSelected}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedRows([...selectedRows, p.id]);
                              } else {
                                setSelectedRows(selectedRows.filter(id => id !== p.id));
                              }
                            }}
                          />
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <img
                              src={p.avatar}
                              alt={p.name}
                              style={{ width: 32, height: 32, borderRadius: '50%' }}
                            />
                            <div>
                              <div style={{ fontWeight: 600, color: '#111827' }}>{p.name}</div>
                              <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                                Variation: {p.variation}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem' }}>₱{Number(p.price).toLocaleString('en-PH', { minimumFractionDigits: 2 })}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              padding: '0.25rem 0.75rem',
                              fontSize: '0.75rem',
                              fontWeight: 500,
                              borderRadius: '9999px',
                              color: style.color,
                              backgroundColor: style.background,
                              border: `1px solid ${style.border}`
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
                              color:
                                p.status === 'Pending'
                                  ? '#92400E'
                                  : p.status === 'Approved'
                                  ? '#15803D'
                                  : '#DC2626',
                              backgroundColor:
                                p.status === 'Pending'
                                  ? '#FEF3C7'
                                  : p.status === 'Approved'
                                  ? '#D1FAE5'
                                  : '#FEE2E2',
                              border: `1px solid ${
                                p.status === 'Pending'
                                  ? '#92400E'
                                  : p.status === 'Approved'
                                  ? '#15803D'
                                  : '#DC2626'
                              }`
                            }}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: '0.75rem',
                            textAlign: 'left',
                            minWidth: 160
                          }}
                        >
                          <div className="group flex items-center gap-4">
                            <div className="relative flex items-center" style={{ cursor: 'pointer' }}>
                              <Pencil
                                size={20}
                                stroke="#3B82F6"
                                className="cursor-pointer transition-transform duration-200 group-hover:-translate-x-1"
                                onClick={() => handleEdit(p)}
                              />
                              <span
                                className="absolute left-7 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-[#3B82F6] text-sm font-medium transition-opacity duration-200 whitespace-nowrap"
                                style={{ minWidth: 40 }}
                              >
                                Edit
                              </span>
                            </div>
                            <Trash2
                              size={20}
                              stroke="#EF4444"
                              className="cursor-pointer transition-transform duration-200 group-hover:translate-x-8"
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            {/* --- DRAFTS TAB EMPTY CONTENT --- */}
            {activeTab === "Drafts" && (
              <div className="flex items-center justify-center h-48 text-gray-400 text-xl font-semibold">
                No drafts available.
              </div>
            )}
            {/* --- PAGINATION --- */}
            {activeTab === "Active" && (
              <div className="flex justify-center my-6">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="btn btn-sm"
                    disabled={currentPage === 1}
                  >«</button>
                  {Array.from({ length: totalPages }).map((_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`btn btn-sm ${page === currentPage ? 'bg-gray-300 text-black' : 'btn-ghost text-gray-600'}`}
                      >{page}</button>
                    );
                  })}
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="btn btn-sm"
                    disabled={currentPage === totalPages}
                  >»</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* NotifModal */}
      <NotifModal isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
      {/* EditModal */}
      <EditModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        product={editProduct}
        onConfirm={handleUpdateProduct}
      />
    </div>
  );
}
