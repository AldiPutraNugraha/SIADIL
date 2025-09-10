'use client';

import { useState, useEffect } from 'react';

const SiadilHeaderSimple = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeNotificationTab, setActiveNotificationTab] = useState('notifications');

  // Menu data untuk search - sesuai dengan gambar
  const menuItems = [
    { 
      category: 'GENERALS', 
      items: [
        { name: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
        { name: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        { name: 'Employment', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
        { name: 'Kehadiran, Koreksi, Cuti, dan Dinas', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
      ]
    },
    {
      category: 'APPS & FEATURE',
      items: [
        { name: 'SIADIL', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' }
      ]
    }
  ];

  // Filter menu items based on search query
  const filteredMenuItems = menuItems.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  // Data dummy untuk notifikasi
  const notificationData = {
    notifications: [
      {
        id: 1,
        title: 'Clock In/Out',
        message: 'Clock In - Aldi Putra Nugraha, anda melakukan Clock In pada 2025-09-10 06:54:55. Kerja sehat, kerja selamat!',
        time: '5 hours 56 minutes ago',
        isRead: false,
        type: 'clock-in'
      },
      {
        id: 2,
        title: 'Clock In/Out',
        message: 'Clock Out - Aldi Putra Nugraha, anda melakukan Clock Out pada 2025-09-09 16:19:44. Patuhi peraturan lalu lintas saat berkendara!',
        time: '8 hours 38 minutes ago',
        isRead: false,
        type: 'clock-out'
      },
      {
        id: 3,
        title: 'Clock In/Out',
        message: 'Clock In - Aldi Putra Nugraha, anda melakukan Clock In pada 2025-09-09 07:07:05. Kerja sehat, kerja selamat!',
        time: '17 hours 51 minutes ago',
        isRead: false,
        type: 'clock-in'
      }
    ],
    announcements: [
      {
        id: 1,
        title: 'Pengumuman Sistem Maintenance',
        message: 'Sistem akan mengalami maintenance pada tanggal 15 September 2025 pukul 00:00 - 06:00 WIB.',
        time: '2 days ago',
        isRead: true
      },
      {
        id: 2,
        title: 'Update Kebijakan Kerja',
        message: 'Kebijakan kerja dari rumah telah diperbarui. Silakan baca panduan terbaru di portal karyawan.',
        time: '5 days ago',
        isRead: false
      },
      {
        id: 3,
        title: 'Pelatihan Wajib Keselamatan',
        message: 'Seluruh karyawan diwajibkan mengikuti pelatihan keselamatan kerja pada tanggal 25 September 2025.',
        time: '1 week ago',
        isRead: false
      }
    ],
    reminders: [
      {
        id: 1,
        title: 'Reminder Laporan Bulanan',
        message: 'Jangan lupa untuk submit laporan bulanan sebelum tanggal 15.',
        time: '1 day ago',
        isRead: false
      },
      {
        id: 2,
        title: 'Deadline Evaluasi Kinerja',
        message: 'Evaluasi kinerja semester ini akan berakhir pada tanggal 20 September 2025.',
        time: '3 days ago',
        isRead: false
      },
      {
        id: 3,
        title: 'Perpanjangan Kontrak',
        message: 'Silakan hubungi HRD untuk proses perpanjangan kontrak yang akan berakhir bulan ini.',
        time: '1 week ago',
        isRead: true
      }
    ],
    approvals: [
      {
        id: 1,
        title: 'Persetujuan Cuti Tahunan',
        message: 'Pengajuan cuti tahunan Anda telah disetujui untuk tanggal 20-22 September 2025.',
        time: '3 hours ago',
        isRead: false
      },
      {
        id: 2,
        title: 'Approval Overtime Request',
        message: 'Permintaan lembur untuk proyek SIADIL telah disetujui untuk minggu ini.',
        time: '1 day ago',
        isRead: false
      },
      {
        id: 3,
        title: 'Persetujuan Reimbursement',
        message: 'Pengajuan reimbursement transport sebesar Rp 150.000 telah disetujui.',
        time: '2 days ago',
        isRead: true
      }
    ]
  };

  // Function untuk cek apakah ada notifikasi yang belum dibaca
  const hasUnreadNotifications = () => {
    return notificationData.notifications.some(n => !n.isRead) ||
           notificationData.announcements.some(a => !a.isRead) ||
           notificationData.reminders.some(r => !r.isRead) ||
           notificationData.approvals.some(a => !a.isRead);
  };

  // Function untuk mendapatkan data berdasarkan tab aktif
  const getActiveNotificationData = () => {
    switch (activeNotificationTab) {
      case 'announcements':
        return notificationData.announcements;
      case 'reminders':
        return notificationData.reminders;
      case 'approvals':
        return notificationData.approvals;
      default:
        return notificationData.notifications;
    }
  };

  useEffect(() => {
    setIsClient(true);
    
    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (isProfileDropdownOpen && event.target instanceof Element) {
        const dropdown = document.querySelector('[data-dropdown="profile"]');
        if (dropdown && !dropdown.contains(event.target)) {
          setIsProfileDropdownOpen(false);
        }
      }
      if (isNotificationOpen && event.target instanceof Element) {
        const notificationDropdown = document.querySelector('[data-dropdown="notification"]');
        if (notificationDropdown && !notificationDropdown.contains(event.target)) {
          setIsNotificationOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    const applyToAllElements = (isDark: boolean) => {
      // Update MainLayout backgrounds - menggunakan warna seperti Demplon
      const mainLayouts = document.querySelectorAll('[class*="min-h-screen"], [class*="flex-1"]');
      mainLayouts.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.backgroundColor = isDark ? '#0c0a09' : '#ffffff';
          el.style.color = isDark ? '#f1f5f9' : '#111827';
        }
      });

      // Update Sidebar - warna dark blue seperti referensi
      const sidebar = document.querySelector('[class*="w-60"]');
      if (sidebar instanceof HTMLElement) {
        sidebar.style.backgroundColor = isDark ? '#0c0a09' : '#ffffff';
        sidebar.style.borderColor = isDark ? '#334155' : '#e5e7eb';
      }

      // Update all cards and containers
      const cards = document.querySelectorAll('[class*="bg-white"], [class*="bg-gray"], [class*="rounded-lg"]');
      cards.forEach(card => {
        if (card instanceof HTMLElement) {
          // Main card backgrounds
          if (card.className.includes('bg-white') || card.className.includes('bg-gray-50') || card.className.includes('bg-gray-100')) {
            card.style.backgroundColor = isDark ? '#0c0a09' : '#ffffff';
            card.style.borderColor = isDark ? '#334155' : '#e5e7eb';
          }
          
          // Text colors
          const textElements = card.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
          textElements.forEach(textEl => {
            if (textEl instanceof HTMLElement) {
              if (textEl.className.includes('text-gray-900') || textEl.className.includes('text-gray-600')) {
                textEl.style.color = isDark ? '#f1f5f9' : '#111827';
              }
            }
          });
        }
      });

      // Update colored cards dengan warna yang lebih sesuai
      const coloredCards = document.querySelectorAll('[class*="bg-red-"], [class*="bg-green-"], [class*="bg-blue-"]');
      coloredCards.forEach(card => {
        if (card instanceof HTMLElement) {
          if (card.className.includes('bg-red-50')) {
            card.style.backgroundColor = isDark ? 'rgba(153, 27, 27, 0.3)' : '#fef2f2';
            card.style.borderColor = isDark ? '#dc2626' : '#fecaca';
          }
          if (card.className.includes('bg-green-50')) {
            card.style.backgroundColor = isDark ? 'rgba(22, 101, 52, 0.3)' : '#f0fdf4';
            card.style.borderColor = isDark ? '#16a34a' : '#bbf7d0';
          }
          if (card.className.includes('bg-blue-50')) {
            card.style.backgroundColor = isDark ? 'rgba(30, 64, 175, 0.3)' : '#eff6ff';
            card.style.borderColor = isDark ? '#3b82f6' : '#bfdbfe';
          }
        }
      });

      // Update sidebar menu items
      const menuItems = document.querySelectorAll('[class*="flex items-center"], button');
      menuItems.forEach(item => {
        if (item instanceof HTMLElement && item.closest('[class*="w-60"]')) {
          const isActive = item.style.backgroundColor === 'rgb(1, 121, 59)';
          if (!isActive) {
            item.style.color = isDark ? '#cbd5e1' : '#111827';
          }
        }
      });
    };

    const applyInitialTheme = (isDark: boolean) => {
      const html = document.documentElement;
      
      if (isDark) {
        html.classList.add('dark');
        html.style.backgroundColor = '#0c0a09';
        html.style.color = '#f1f5f9';
        localStorage.setItem('theme', 'dark');
      } else {
        html.classList.remove('dark');
        html.style.backgroundColor = '#ffffff';
        html.style.color = '#111827';
        localStorage.setItem('theme', 'light');
      }

      // Force apply to body as well
      document.body.style.backgroundColor = isDark ? '#0c0a09' : '#ffffff';
      document.body.style.color = isDark ? '#f1f5f9' : '#111827';
      
      // Apply to all main components
      applyToAllElements(isDark);
      
      console.log('Initial theme applied:', isDark ? 'dark' : 'light');
    };
    
    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    const shouldBeDark = savedTheme === 'dark';
    
    setIsDarkMode(shouldBeDark);
    
    // Add delay to ensure all elements are rendered
    setTimeout(() => {
      applyInitialTheme(shouldBeDark);
    }, 100);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isProfileDropdownOpen, isNotificationOpen]);

  // Keyboard shortcuts and search modal handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
        setIsNotificationOpen(false);
      }
      // Cmd+K or Ctrl+K untuk membuka search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    const applyToAllElements = (isDark: boolean) => {
      // Update MainLayout backgrounds
      const mainLayouts = document.querySelectorAll('[class*="min-h-screen"], [class*="flex-1"]');
      mainLayouts.forEach(el => {
        if (el instanceof HTMLElement) {
          el.style.backgroundColor = isDark ? '#0c0a09' : '#ffffff';
          el.style.color = isDark ? '#f1f5f9' : '#111827';
        }
      });

      // Update Sidebar
      const sidebar = document.querySelector('[class*="w-60"]');
      if (sidebar instanceof HTMLElement) {
        sidebar.style.backgroundColor = isDark ? '#0c0a09' : '#ffffff';
        sidebar.style.borderColor = isDark ? '#334155' : '#e5e7eb';
      }

      // Update all cards and containers
      const cards = document.querySelectorAll('[class*="bg-white"], [class*="bg-gray"], [class*="rounded-lg"]');
      cards.forEach(card => {
        if (card instanceof HTMLElement) {
          // Main card backgrounds
          if (card.className.includes('bg-white') || card.className.includes('bg-gray-50') || card.className.includes('bg-gray-100')) {
            card.style.backgroundColor = isDark ? '#0c0a09' : '#ffffff';
            card.style.borderColor = isDark ? '#334155' : '#e5e7eb';
          }
          
          // Text colors
          const textElements = card.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div');
          textElements.forEach(textEl => {
            if (textEl instanceof HTMLElement) {
              if (textEl.className.includes('text-gray-900') || textEl.className.includes('text-gray-600')) {
                textEl.style.color = isDark ? '#f1f5f9' : '#111827';
              }
            }
          });
        }
      });

      // Update colored cards
      const coloredCards = document.querySelectorAll('[class*="bg-red-"], [class*="bg-green-"], [class*="bg-blue-"]');
      coloredCards.forEach(card => {
        if (card instanceof HTMLElement) {
          if (card.className.includes('bg-red-50')) {
            card.style.backgroundColor = isDark ? 'rgba(153, 27, 27, 0.3)' : '#fef2f2';
            card.style.borderColor = isDark ? '#dc2626' : '#fecaca';
          }
          if (card.className.includes('bg-green-50')) {
            card.style.backgroundColor = isDark ? 'rgba(22, 101, 52, 0.3)' : '#f0fdf4';
            card.style.borderColor = isDark ? '#16a34a' : '#bbf7d0';
          }
          if (card.className.includes('bg-blue-50')) {
            card.style.backgroundColor = isDark ? 'rgba(30, 64, 175, 0.3)' : '#eff6ff';
            card.style.borderColor = isDark ? '#3b82f6' : '#bfdbfe';
          }
        }
      });

      // Update sidebar menu items
      const menuItems = document.querySelectorAll('[class*="flex items-center"], button');
      menuItems.forEach(item => {
        if (item instanceof HTMLElement && item.closest('[class*="w-60"]')) {
          const isActive = item.style.backgroundColor === 'rgb(1, 121, 59)';
          if (!isActive) {
            item.style.color = isDark ? '#cbd5e1' : '#111827';
          }
        }
      });
    };

    // Apply theme to HTML and body
    const html = document.documentElement;
    
    if (newDarkMode) {
      html.classList.add('dark');
      html.style.backgroundColor = '#0c0a09';
      html.style.color = '#f1f5f9';
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      html.style.backgroundColor = '#ffffff';
      html.style.color = '#111827';
      localStorage.setItem('theme', 'light');
    }

    // Force apply to body as well
    document.body.style.backgroundColor = newDarkMode ? '#0c0a09' : '#ffffff';
    document.body.style.color = newDarkMode ? '#f1f5f9' : '#111827';
    
    // Apply to all components
    applyToAllElements(newDarkMode);
    
    console.log('Theme toggled to:', newDarkMode ? 'dark' : 'light');
  };

  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* CSS Animations */}
      <style>
        {`
          @keyframes blinkNotification {
            0%, 50% { 
              opacity: 1; 
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7);
            }
            25% { 
              transform: scale(1.2);
              box-shadow: 0 0 0 6px rgba(34, 197, 94, 0.3);
            }
            51%, 100% { 
              opacity: 0.6; 
              transform: scale(1);
              box-shadow: 0 0 0 0 rgba(34, 197, 94, 0);
            }
          }
          
          .notification-blink {
            animation: blinkNotification 2s ease-in-out infinite;
          }
          
          .notification-tabs::-webkit-scrollbar {
            height: 8px;
          }
          .notification-tabs::-webkit-scrollbar-track {
            background: ${isDarkMode ? '#374151' : '#f3f4f6'};
            border-radius: 4px;
          }
          .notification-tabs::-webkit-scrollbar-thumb {
            background: #9ca3af;
            border-radius: 4px;
          }
          .notification-tabs::-webkit-scrollbar-thumb:hover {
            background: #6b7280;
          }
        `}
      </style>
      
      <div style={{ 
        backgroundColor: isDarkMode ? '#0c0a09' : '#ffffff',
        borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
        padding: '12px 24px',
        transition: 'all 0.3s ease'
      }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          
          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search command..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClick={() => setIsSearchModalOpen(true)}
              style={{
                padding: '8px 48px 8px 16px',
                border: `1px solid ${isDarkMode ? '#475569' : '#d1d5db'}`,
                borderRadius: '8px',
                width: '256px',
                fontSize: '14px',
                backgroundColor: isDarkMode ? '#0c0a09' : '#ffffff',
                color: isDarkMode ? '#f1f5f9' : '#111827',
                outline: 'none'
              }}
            />
            <div style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: isDarkMode ? '#475569' : '#f3f4f6',
              color: isDarkMode ? '#94a3b8' : '#6b7280',
              padding: '2px 8px',
              borderRadius: '4px',
              fontSize: '12px'
            }}>
              ⌘K
            </div>
          </div>

          {/* Notification Bell */}
          <div style={{ position: 'relative' }} data-dropdown="notification">
            <button 
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              style={{
                padding: '8px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: 'none',
                color: isDarkMode ? '#94a3b8' : '#6b7280',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f3f4f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title="Notifications"
            >
              {/* Bell Icon */}
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              {/* Green notification badge - hanya tampil jika ada unread notifications */}
              {hasUnreadNotifications() && (
                <div 
                  className="notification-blink"
                  style={{
                    position: 'absolute',
                    top: '4px',
                    right: '4px',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#22c55e',
                    borderRadius: '50%',
                    border: `2px solid ${isDarkMode ? '#0c0a09' : '#ffffff'}`
                  }}
                ></div>
              )}
            </button>

            {/* Notification Dropdown */}
            {isNotificationOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: '0',
                marginTop: '8px',
                width: '400px',
                backgroundColor: isDarkMode ? '#0c0a09' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                borderRadius: '12px',
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                zIndex: 1000,
                overflow: 'hidden'
              }}>
                {/* Header Tabs dengan Scrollbar Horizontal */}
                <div style={{
                  borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                  backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
                }}>
                  {/* Tabs Container dengan Scrollbar */}
                  <div style={{
                    overflowX: 'auto',
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#9ca3af #f3f4f6',
                    width: '100%'
                  }}>
                    <div 
                      className="notification-tabs"
                      style={{
                        display: 'flex',
                        minWidth: 'max-content'
                      }}
                    >
                    <div 
                      style={{
                        minWidth: '120px',
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: activeNotificationTab === 'notifications' ? (isDarkMode ? '#f1f5f9' : '#111827') : (isDarkMode ? '#94a3b8' : '#64748b'),
                        borderBottom: activeNotificationTab === 'notifications' ? '2px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={() => setActiveNotificationTab('notifications')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span>Notifications</span>
                        <div style={{
                          backgroundColor: '#22c55e',
                          color: '#ffffff',
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          minWidth: '16px',
                          textAlign: 'center'
                        }}>
                          {notificationData.notifications.filter(n => !n.isRead).length}
                        </div>
                      </div>
                    </div>
                    <div 
                      style={{
                        minWidth: '140px',
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: activeNotificationTab === 'announcements' ? (isDarkMode ? '#f1f5f9' : '#111827') : (isDarkMode ? '#94a3b8' : '#64748b'),
                        borderBottom: activeNotificationTab === 'announcements' ? '2px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={() => setActiveNotificationTab('announcements')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                        <span>Announcements</span>
                        <div style={{
                          backgroundColor: '#3b82f6',
                          color: '#ffffff',
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          minWidth: '16px',
                          textAlign: 'center'
                        }}>
                          {notificationData.announcements.filter(a => !a.isRead).length}
                        </div>
                      </div>
                    </div>
                    <div 
                      style={{
                        minWidth: '120px',
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: activeNotificationTab === 'reminders' ? (isDarkMode ? '#f1f5f9' : '#111827') : (isDarkMode ? '#94a3b8' : '#64748b'),
                        borderBottom: activeNotificationTab === 'reminders' ? '2px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={() => setActiveNotificationTab('reminders')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m5 0h2a2 2 0 002-2V7a2 2 0 00-2-2h-2m-5 4v6m5-6v6m-5 0H9m5 0h2" />
                        </svg>
                        <span>Reminders</span>
                        <div style={{
                          backgroundColor: '#f59e0b',
                          color: '#ffffff',
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          minWidth: '16px',
                          textAlign: 'center'
                        }}>
                          {notificationData.reminders.filter(r => !r.isRead).length}
                        </div>
                      </div>
                    </div>
                    <div 
                      style={{
                        minWidth: '120px',
                        padding: '12px 16px',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '500',
                        color: activeNotificationTab === 'approvals' ? (isDarkMode ? '#f1f5f9' : '#111827') : (isDarkMode ? '#94a3b8' : '#64748b'),
                        borderBottom: activeNotificationTab === 'approvals' ? '2px solid #3b82f6' : 'none',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                      onClick={() => setActiveNotificationTab('approvals')}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Approvals</span>
                        <div style={{
                          backgroundColor: '#3b82f6',
                          color: '#ffffff',
                          fontSize: '10px',
                          padding: '2px 6px',
                          borderRadius: '10px',
                          minWidth: '16px',
                          textAlign: 'center'
                        }}>
                          {notificationData.approvals.filter(a => !a.isRead).length}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                </div>

                {/* Notification Content */}
                <div style={{
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}>
                  {getActiveNotificationData().map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: '16px',
                        borderBottom: `1px solid ${isDarkMode ? '#334155' : '#f1f5f9'}`,
                        cursor: 'pointer',
                        backgroundColor: item.isRead ? 'transparent' : (isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)')
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f8fafc';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = item.isRead ? 'transparent' : (isDarkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.05)');
                      }}
                    >
                      <div style={{ display: 'flex', gap: '12px' }}>
                        <div style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: item.isRead ? 'transparent' : '#3b82f6',
                          borderRadius: '50%',
                          marginTop: '6px',
                          flexShrink: 0
                        }}></div>
                        <div style={{ flex: 1 }}>
                          <div style={{
                            fontSize: '14px',
                            fontWeight: '600',
                            color: '#3b82f6',
                            marginBottom: '4px'
                          }}>
                            {item.title}
                          </div>
                          <div style={{
                            fontSize: '13px',
                            color: isDarkMode ? '#cbd5e1' : '#64748b',
                            lineHeight: '1.4',
                            marginBottom: '8px'
                          }}>
                            {item.message}
                          </div>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: '12px',
                              color: isDarkMode ? '#94a3b8' : '#6b7280'
                            }}>
                              {item.time}
                            </span>
                            <button style={{
                              fontSize: '12px',
                              color: '#22c55e',
                              backgroundColor: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              fontWeight: '500'
                            }}>
                              Read
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div style={{
                  padding: '12px 16px',
                  borderTop: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                  backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <button style={{
                    fontSize: '14px',
                    color: isDarkMode ? '#94a3b8' : '#64748b',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}>
                    View all
                  </button>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button style={{
                      fontSize: '14px',
                      color: '#22c55e',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                      Read all
                    </button>
                    <span style={{ color: isDarkMode ? '#475569' : '#d1d5db' }}>•</span>
                    <button style={{
                      fontSize: '14px',
                      color: '#ef4444',
                      backgroundColor: 'transparent',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                      Delete all
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with Dropdown */}
          <div style={{ position: 'relative' }} data-dropdown="profile">
            <button 
              onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
              style={{
                padding: '2px',
                borderRadius: '50%',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isDarkMode ? 'rgba(51, 65, 85, 0.3)' : 'rgba(243, 244, 246, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              title="User Profile"
            >
              <div 
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: isDarkMode ? '#7c2d12' : '#dc2626',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '600'
                }}
              >
                DF
              </div>
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  marginTop: '8px',
                  backgroundColor: isDarkMode ? '#0c0a09' : '#ffffff',
                  border: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  minWidth: '200px',
                  zIndex: 50,
                  overflow: 'hidden'
                }}
              >
                {/* User Info Section */}
                <div 
                  style={{
                    padding: '12px 16px',
                    borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e5e7eb'}`,
                  }}
                >
                  <div 
                    style={{
                      fontWeight: '600',
                      color: isDarkMode ? '#f1f5f9' : '#111827',
                      fontSize: '14px'
                    }}
                  >
                    Difa Nugraha
                  </div>
                  <div 
                    style={{
                      color: isDarkMode ? '#94a3b8' : '#6b7280',
                      fontSize: '12px',
                      marginTop: '2px'
                    }}
                  >
                    10122059
                  </div>
                </div>

                {/* Menu Items */}
                <div style={{ padding: '8px 0' }}>
                  {/* Profile */}
                  <button
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: isDarkMode ? '#f1f5f9' : '#111827',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>Profile</span>
                    </div>
                    <span style={{ 
                      fontSize: '12px', 
                      color: isDarkMode ? '#94a3b8' : '#6b7280' 
                    }}>
                      ⌘P
                    </span>
                  </button>

                  {/* Settings */}
                  <button
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: isDarkMode ? '#f1f5f9' : '#111827',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>Settings</span>
                    </div>
                    <span style={{ 
                      fontSize: '12px', 
                      color: isDarkMode ? '#94a3b8' : '#6b7280' 
                    }}>
                      ⌘S
                    </span>
                  </button>

                  {/* Log out */}
                  <button
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '8px 16px',
                      border: 'none',
                      backgroundColor: 'transparent',
                      color: isDarkMode ? '#f1f5f9' : '#111827',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f3f4f6';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Log out</span>
                    </div>
                    <span style={{ 
                      fontSize: '12px', 
                      color: isDarkMode ? '#94a3b8' : '#6b7280' 
                    }}>
                      ⌘Q
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            style={{
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: 'transparent',
              border: 'none',
              color: isDarkMode ? '#94a3b8' : '#6b7280',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDarkMode ? '#334155' : '#f3f4f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? (
              // Sun icon for light mode
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              // Moon icon for dark mode  
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '64px'
          }}
          onClick={() => setIsSearchModalOpen(false)}
        >
          <div 
            style={{
              backgroundColor: isDarkMode ? '#0c0a09' : '#ffffff',
              border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
              borderRadius: '12px',
              width: '600px',
              maxHeight: '500px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input in Modal */}
            <div style={{ padding: '20px 20px 0 20px' }}>
              <div style={{ position: 'relative' }}>
                <svg 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: isDarkMode ? '#94a3b8' : '#64748b'
                  }}
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.35-4.35"></path>
                </svg>
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    height: '48px',
                    paddingLeft: '48px',
                    paddingRight: '16px',
                    backgroundColor: isDarkMode ? '#1e293b' : '#f8fafc',
                    border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                    borderRadius: '8px',
                    fontSize: '16px',
                    color: isDarkMode ? '#f1f5f9' : '#334155',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Menu Results */}
            <div style={{ 
              maxHeight: '400px', 
              overflowY: 'auto',
              padding: '16px 20px 20px 20px'
            }}>
              {filteredMenuItems.length > 0 ? (
                filteredMenuItems.map((category, categoryIndex) => (
                  <div key={categoryIndex} style={{ marginBottom: '24px' }}>
                    {/* Category Title */}
                    <div style={{
                      fontSize: '12px',
                      fontWeight: '600',
                      color: isDarkMode ? '#94a3b8' : '#64748b',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      marginBottom: '8px'
                    }}>
                      {category.category}
                    </div>
                    
                    {/* Menu Items */}
                    {category.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          backgroundColor: 'transparent',
                          transition: 'background-color 0.2s',
                          marginBottom: '4px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = isDarkMode ? '#1e293b' : '#f1f5f9';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                        onClick={() => {
                          setIsSearchModalOpen(false);
                          setSearchQuery('');
                        }}
                      >
                        {/* Icon */}
                        <div style={{
                          width: '20px',
                          height: '20px',
                          marginRight: '12px',
                          color: isDarkMode ? '#94a3b8' : '#64748b'
                        }}>
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                          </svg>
                        </div>
                        
                        {/* Name */}
                        <span style={{
                          fontSize: '14px',
                          color: isDarkMode ? '#f1f5f9' : '#111827',
                          fontWeight: '500'
                        }}>
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: isDarkMode ? '#94a3b8' : '#64748b'
                }}>
                  <svg 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1" 
                    style={{ margin: '0 auto 16px auto', opacity: '0.5' }}
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <div style={{ fontSize: '14px' }}>
                    Tidak ada hasil untuk &quot;{searchQuery}&quot;
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default SiadilHeaderSimple;
