import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const translations = {
    uk: {
      locale: 'uk',
      greeting: "Привіт, друже 👋",
      forwardButton: "🚀 Вперед",
      loginTitle: "Вхід до акаунту",
      loginPlaceholder: "Логін",
      passwordPlaceholder: "Пароль",
      loginButton: "Увійти",
      settings: "Налаштування",
      account: "Акаунт",
      theme: "Тема",
      language: "Мова",
      night: "Ніч",
      day: "День",
      ukrainian: "Українська",
      english: "Англійська",
      logout: "Вийти",
      logoutAlert: "Ви вийшли!",
      create: "Створити",
      createModalTitle: "Створити новий об'єкт",
      createModalField1: "Назва",
      createModalField2: "Опис",
      createModalButton: "Створити",
      cancel: "Скасувати",
      searchPlaceholder: "Пошук...",
    },
    en: {
      locale: 'en',
      greeting: "Hello, friend 👋",
      forwardButton: "🚀 Forward",
      loginTitle: "Account Login",
      loginPlaceholder: "Login",
      passwordPlaceholder: "Password",
      loginButton: "Log In",
      settings: "Settings",
      account: "Account",
      theme: "Theme",
      language: "Language",
      night: "Night",
      day: "Day",
      ukrainian: "Ukrainian",
      english: "English",
      logout: "Logout",
      logoutAlert: "You have logged out!",
      create: "Create",
      createModalTitle: "Create New Item",
      createModalField1: "Title",
      createModalField2: "Description",
      createModalButton: "Create",
      cancel: "Cancel",
      searchPlaceholder: "Search...",
    },
  };

  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('uk');
  const [currentLanguage, setCurrentLanguage] = useState(translations['uk']);
  const [languageTransition, setLanguageTransition] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [stars, setStars] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownClosing, setIsDropdownClosing] = useState(false);
  const [formPosition, setFormPosition] = useState({ top: '50%', left: '50%', scale: 1, opacity: 0 });
  const [animateForm, setAnimateForm] = useState(false);
  const [showTopBar, setShowTopBar] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [isSettingsClosing, setIsSettingsClosing] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [isAccountClosing, setIsAccountClosing] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreateModalClosing, setIsCreateModalClosing] = useState(false);
  const settingsButtonRef = useRef(null);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [searchText, setSearchText] = useState(''); // Стан для відстеження тексту пошуку

  useEffect(() => {
    if (language !== currentLanguage.locale) {
      setLanguageTransition(true);
      setTimeout(() => {
        setCurrentLanguage(translations[language]);
        setLanguageTransition(false);
      }, 300);
    }
  }, [language, currentLanguage]);

  useEffect(() => {
    const generatedStars = [];
    const totalStars = 70;
    for (let i = 0; i < totalStars; i++) {
      generatedStars.push({
        id: i,
        top: Math.random() * 100 + "%",
        left: Math.random() * 100 + "%",
        size: Math.random() * 2 + 1,
        animationDelay: Math.random() * 3 + "s",
      });
    }
    setStars(generatedStars);
  }, []);

  useEffect(() => {
    document.body.style.overflow =
      showForm || dropdownOpen || showSettingsModal || showAccountModal || showLogoutMessage || showCreateModal
        ? "hidden"
        : "auto";
  }, [showForm, dropdownOpen, showSettingsModal, showAccountModal, showLogoutMessage, showCreateModal]);

  const handleMagicButtonClick = () => {
    if (!launched) {
      setLaunched(true);
      setTimeout(() => {
        setShowForm(true);
        setTimeout(() => {
          setFormPosition((prev) => ({ ...prev, opacity: 1 }));
        }, 50);
      }, 1000);
    }
  };

  const handleLoginButtonClick = () => {
    setAnimateForm(true);
    setFormPosition((prev) => ({ ...prev, top: '50%', left: 'calc(100% - 100px)', scale: 0.8 }));
    setTimeout(() => {
      setFormPosition((prev) => ({ ...prev, top: '10%', left: 'calc(100% - 120px)', scale: 0.6, opacity: 0 }));
      setTimeout(() => {
        setShowTopBar(true);
      }, 500);
    }, 500);
  };

  const toggleDropdown = () => {
    if (!isRotating) {
      setIsRotating(true);
      if (dropdownOpen) {
        setIsDropdownClosing(true);
        setTimeout(() => {
          setDropdownOpen(false);
          setIsDropdownClosing(false);
          setIsRotating(false);
        }, 300);
      } else {
        setDropdownOpen(true);
        setTimeout(() => {
          setIsRotating(false);
        }, 300);
      }
      if (settingsButtonRef.current) {
        setRotation((prevRotation) => prevRotation + 360);
      }
    }
  };

  const openSettingsModal = () => {
    setShowSettingsModal(true);
    setIsSettingsClosing(false);
    setDropdownOpen(false);
    setIsDropdownClosing(false);
  };

  const closeSettingsModal = () => {
    setIsSettingsClosing(true);
    setTimeout(() => {
      setShowSettingsModal(false);
      setIsSettingsClosing(false);
    }, 300);
  };

  const openAccountModal = () => {
    setShowAccountModal(true);
    setIsAccountClosing(false);
    setDropdownOpen(false);
    setIsDropdownClosing(false);
  };

  const closeAccountModal = () => {
    setIsAccountClosing(true);
    setTimeout(() => {
      setShowAccountModal(false);
      setIsAccountClosing(false);
    }, 300);
  };

  const handleLogout = () => {
    setShowForm(false);
    setShowTopBar(false);
    setLaunched(false);
    setFormPosition({ top: '50%', left: '50%', scale: 1, opacity: 0 });
    setAnimateForm(false);
    setDropdownOpen(false);
    setIsDropdownClosing(false);
    setShowLogoutMessage(true);
    setTimeout(() => {
      setShowLogoutMessage(false);
    }, 3000);
  };

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
    setIsCreateModalClosing(false);
  };

  const closeCreateModal = () => {
    setIsCreateModalClosing(true);
    setTimeout(() => {
      setShowCreateModal(false);
      setIsCreateModalClosing(false);
    }, 300);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    // Тут ви можете додати логіку фільтрації або пошуку на основі searchText
    console.log("Текст пошуку:", event.target.value);
  };

  const handleCreateSubmit = () => {
    const title = document.getElementById("create-title").value;
    const description = document.getElementById("create-description").value;
    // Тут додайте логіку для створення нового об'єкта (наприклад, відправка на сервер)
    console.log("Створено:", { title, description });
    closeCreateModal();
  };

  return (
    <div className={`app-background ${theme === 'light' ? 'light-theme' : ''}`}>
      {showTopBar && (
        <div className={`top-bar ${showTopBar ? 'visible' : ''}`}>
          <div className="top-bar-left">
            <span className="app-name">Frosti</span>
          </div>
          <div className="top-bar-middle">
            <div className="search-input-container">
              <span className="search-icon" style={{ color: 'rgba(156, 163, 175, 1)' }}>🔍</span>
              <input
                type="text"
                placeholder={currentLanguage.searchPlaceholder || "Пошук..."}
                className="search-input"
                value={searchText}
                onChange={handleSearchChange} // Додано обробник зміни тексту
              />
            </div>
          </div>
          <div className="top-bar-right">
            <button className="create-button" onClick={openCreateModal}>
              {currentLanguage.create}
            </button>
            <button
              ref={settingsButtonRef}
              className={`settings-button ${isRotating ? 'rotating' : ''}`}
              onClick={toggleDropdown}
              style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 0.3s ease' }}
            >
              ⚙️
            </button>
            <ul className={`dropdown-list top-bar-dropdown ${dropdownOpen ? 'open' : ''} ${isDropdownClosing ? 'closing' : ''}`}>
              <li onClick={openSettingsModal} className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>
                {currentLanguage.settings}
              </li>
              <li onClick={openAccountModal} className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>
                {currentLanguage.account}
              </li>
              <li
                className={`logout fade-transition ${languageTransition ? 'fade-out' : ''}`}
                onClick={handleLogout}
              >
                {currentLanguage.logout}
              </li>
            </ul>
          </div>
        </div>
      )}

      <div className="stars">
        {stars.map((star) => (
          <div
            key={star.id}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.animationDelay,
            }}
          ></div>
        ))}
      </div>

      <div className={`content ${showTopBar ? 'top-bar-visible' : ''}`} style={{ paddingTop: showTopBar ? '48px' : '0', display: 'flex' }}>
        <div className="left-panel">
          <div className="left-panel-items">
            <div className="panel-item">Проєкти</div>
            <div className="panel-item">Блоки</div>
            <div className="panel-item">Завдання</div>
            <div className="panel-item">Цілі</div>
            {/* Додайте інші елементи панелі тут */}
          </div>
        </div>
        <div style={{ flexGrow: 1 }}>
          <h1 className={`greeting ${launched ? "fadeOut" : ""} fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.greeting}</h1>
          <button
            className={`magic-button ${launched ? "launched" : ""}`}
            onClick={handleMagicButtonClick}
            disabled={launched}
          >
            {currentLanguage.forwardButton}
          </button>
        </div>
      </div>

      {showForm && (
        <div className={`login-window ${animateForm ? 'animate' : 'show'}`} style={{
          top: formPosition.top,
          left: formPosition.left,
          transform: `translate(-50%, -50%) scale(${formPosition.scale})`,
          opacity: formPosition.opacity,
          transition: 'opacity 0.4s ease, transform 0.8s ease, top 0.8s ease, left 0.8s ease'
        }}>
          <h2 className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.loginTitle}</h2>
          <input type="text" placeholder={currentLanguage.loginPlaceholder} />
          <input type="password" placeholder={currentLanguage.passwordPlaceholder} />
          <button onClick={handleLoginButtonClick}>{currentLanguage.loginButton}</button>
        </div>
      )}

      {showSettingsModal && (
        <div className={`settings-modal ${isSettingsClosing ? 'closing' : 'open'}`}>
          <div className="settings-modal-content">
            <span className="close-button" onClick={closeSettingsModal}>&times;</span>
            <h2 className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.settings}</h2>
            <div className="setting-group">
              <h3 className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.theme}</h3>
              <button
                onClick={() => setTheme('dark')}
                className={theme === 'dark' ? 'active' : ''}
              >
                {currentLanguage.night}
              </button>
              <button
                onClick={() => setTheme('light')}
                className={theme === 'light' ? 'active' : ''}
              >
                {currentLanguage.day}
              </button>
            </div>
            <div className="setting-group">
              <h3 className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.language}</h3>
              <button
                onClick={() => handleSetLanguage('uk')}
                className={language === 'uk' ? 'active' : ''}
              >
                {currentLanguage.ukrainian}
              </button>
              <button
                onClick={() => handleSetLanguage('en')}
                className={language === 'en' ? 'active' : ''}
              >
                {currentLanguage.english}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAccountModal && (
        <div className={`settings-modal ${isAccountClosing ? 'closing' : 'open'}`}>
          <div className="settings-modal-content">
            <span className="close-button" onClick={closeAccountModal}>&times;</span>
            <h2 className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.account}</h2>
            {/* Тут може бути інформація про акаунт */}
          </div>
        </div>
      )}

      {showLogoutMessage && (
        <div className="logout-message-modal open">
          {currentLanguage.logoutAlert}
        </div>
      )}

      {showCreateModal && (
        <div className={`settings-modal ${isCreateModalClosing ? 'closing' : 'open'}`}>
          <div className="settings-modal-content">
            <span className="close-button" onClick={closeCreateModal}>&times;</span>
            <h2 className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.createModalTitle}</h2>
            <div className="setting-group">
              <label htmlFor="create-title" className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.createModalField1}:</label>
              <input type="text" id="create-title" />
            </div>
            <div className="setting-group">
              <label htmlFor="create-description" className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.createModalField2}:</label>
              <textarea id="create-description"></textarea>
            </div>
            <div className="modal-actions">
              <button onClick={handleCreateSubmit} className="create-action-button">{currentLanguage.createModalButton}</button>
              <button onClick={closeCreateModal} className="cancel-button">{currentLanguage.cancel}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;