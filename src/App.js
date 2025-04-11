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
      registerTextButton: "Зареєструватись",
      registerTitle: "Реєстрація",
      emailPlaceholder: "Електронна пошта",
      fullNamePlaceholder: "Повне ім'я",
      passwordPlaceholderReg: "Пароль",
      confirmPasswordPlaceholder: "Підтвердіть пароль",
      privacyPolicyCheckbox: "Я погоджуюсь з обробкою персональних даних",
      registerSubmitButton: "Зареєструватись",
      settings: "Налаштування",
      account: "Акаунт",
      theme: "Тема",
      language: "Мова",
      night: "Ніч",
      day: "День",
      ukrainian: "Українська",
      english: "English",
      logout: "Вийти",
      logoutAlert: "Ви вийшли!",
      create: "Створити",
      createModalTitle: "Створити новий об'єкт",
      createModalField1: "Назва",
      createModalField2: "Опис",
      createModalButton: "Створити",
      cancel: "Скасувати",
      searchPlaceholder: "Пошук...",
      projects: "Проєкти",
      blocks: "Блоки",
      tasks: "Завдання",
      goals: "Цілі",
    },
    en: {
      locale: 'en',
      greeting: "Hello, friend 👋",
      forwardButton: "🚀 Forward",
      loginTitle: "Account Login",
      loginPlaceholder: "Login",
      passwordPlaceholder: "Password",
      loginButton: "Log In",
      registerTextButton: "Register",
      registerTitle: "Registration",
      emailPlaceholder: "Email",
      fullNamePlaceholder: "Full Name",
      passwordPlaceholderReg: "Password",
      confirmPasswordPlaceholder: "Confirm Password",
      privacyPolicyCheckbox: "I agree to the processing of personal data",
      registerSubmitButton: "Register",
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
      projects: "Projects",
      blocks: "Blocks",
      tasks: "Tasks",
      goals: "Goals",
    },
  };

  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('uk');
  const [currentLanguage, setCurrentLanguage] = useState(translations['uk']);
  const [languageTransition, setLanguageTransition] = useState(false);
  const [launched, setLaunched] = useState(false);
  const [showLoginWindow, setShowLoginWindow] = useState(false);
  const [showRegisterWindow, setShowRegisterWindow] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [stars, setStars] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDropdownClosing, setIsDropdownClosing] = useState(false);
  const [formPosition, setFormPosition] = useState({ top: '50%', left: '50%', scale: 0.8, opacity: 0 });
  const [animateForm, setAnimateForm] = useState(false);
  const [showTopBar, setShowTopBar] = useState(false);
  const [showLeftPanel, setShowLeftPanel] = useState(false);
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
  const [searchText, setSearchText] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [registerFormPosition, setRegisterFormPosition] = useState({ opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' });
  const [mainMenuVisible, setMainMenuVisible] = useState(false);
  const [mainMenuOpacity, setMainMenuOpacity] = useState(0);

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
      showLoginWindow || dropdownOpen || showSettingsModal || showAccountModal || showLogoutMessage || showCreateModal || showRegisterWindow
        ? "hidden"
        : "auto";
  }, [showLoginWindow, dropdownOpen, showSettingsModal, showAccountModal, showLogoutMessage, showCreateModal, showRegisterWindow]);

  const handleMagicButtonClick = () => {
    if (!launched) {
      setLaunched(true);
      setTimeout(() => {
        setFormVisible(true);
        setTimeout(() => {
          setFormPosition((prev) => ({ ...prev, opacity: 1, scale: 1 }));
        }, 300); // Збільшено час для плавнішого переходу
      }, 500); // Зменшено затримку для швидшого показу форми
    }
  };

  const handleLoginButtonClick = () => {
    setAnimateForm(true);
    setFormPosition((prev) => ({ ...prev, opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' }));
    setTimeout(() => {
      setShowLoginWindow(false);
      setMainMenuVisible(true);
      setTimeout(() => {
        setMainMenuOpacity(1);
        setShowTopBar(true);
        setShowLeftPanel(true);
      }, 300);
    }, 300);
  };

  const handleRegisterTextButtonClick = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setFormPosition((prev) => ({ ...prev, opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' }));
      setTimeout(() => {
        setShowLoginWindow(false);
        setShowRegisterWindow(true);
        setTimeout(() => {
          setRegisterFormPosition({ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' });
          setIsTransitioning(false);
        }, 300);
      }, 300);
    }
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    // Тут можна додати логіку для відправки даних реєстрації
    console.log("Дані реєстрації:", {
      email: event.target.email.value,
      fullName: event.target.fullName.value,
      password: event.target.password.value,
      confirmPassword: event.target.confirmPassword.value,
      privacyPolicy: event.target.privacyPolicy.checked,
    });
    setIsTransitioning(true);
    setRegisterFormPosition({ opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' });
    setTimeout(() => {
      setShowRegisterWindow(false);
      setShowLoginWindow(true);
      setTimeout(() => {
        setFormPosition({ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' });
        setIsTransitioning(false);
      }, 300);
    }, 300);
  };

  const handleBackToLogin = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setRegisterFormPosition({ opacity: 0, transform: 'translate(-50%, -50%) scale(0.8)' });
      setTimeout(() => {
        setShowRegisterWindow(false);
        setShowLoginWindow(true);
        setTimeout(() => {
          setFormPosition({ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' });
          setIsTransitioning(false);
        }, 300);
      }, 300);
    }
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
    setMainMenuVisible(false);
    setMainMenuOpacity(0);
    setShowTopBar(false);
    setShowLeftPanel(false);
    setLaunched(false);
    setFormVisible(false);
    setFormPosition({ top: '50%', left: '50%', scale: 0.8, opacity: 0 });
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
    console.log("Текст пошуку:", event.target.value);
  };

  const handleCreateSubmit = () => {
    const title = document.getElementById("create-title").value;
    const description = document.getElementById("create-description").value;
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
                onChange={handleSearchChange}
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

      <div className={`content ${showTopBar ? 'top-bar-visible' : ''} ${showLeftPanel ? 'left-panel-visible' : ''}`}>
        {showLeftPanel && (
          <div className="left-panel" style={{ opacity: mainMenuOpacity, transition: 'opacity 0.3s ease-in-out' }}>
            <div className="left-panel-items">
              <div className="panel-item">{currentLanguage.projects}</div>
              <div className="panel-item">{currentLanguage.blocks}</div>
              <div className="panel-item">{currentLanguage.tasks}</div>
              <div className="panel-item">{currentLanguage.goals}</div>
              {/* Додайте інші елементи панелі тут */}
            </div>
          </div>
        )}
        <div className="initial-content" style={{ display: !launched ? 'flex' : 'none', opacity: launched ? 0 : 1, transition: 'opacity 0.5s ease-in-out' }}>
          <h1 className={`greeting ${launched ? "fadeOut" : ""} fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.greeting}</h1>
          <button
            className={`magic-button ${launched ? "launched" : ""}`}
            onClick={handleMagicButtonClick}
            disabled={launched}
            style={{ opacity: launched ? 0.5 : 1, transition: 'opacity 0.5s ease-in-out 0.2s' }}
          >
            {currentLanguage.forwardButton}
          </button>
        </div>

        {formVisible && (
          <div className={`login-window ${animateForm ? 'animate' : ''} ${showLoginWindow ? 'show' : ''}`} style={{
            transform: `translate(-50%, -50%) scale(${formPosition.scale})`,
            opacity: formPosition.opacity,
            transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
          }}>
            <h2 className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.loginTitle}</h2>
            <input type="text" placeholder={currentLanguage.loginPlaceholder} />
            <input type="password" placeholder={currentLanguage.passwordPlaceholder} />
            <button className="login-button" onClick={handleLoginButtonClick} style={{ transition: 'opacity 0.3s ease-in-out 0.3s' }}>{currentLanguage.loginButton}</button>
            <button className="register-text-button" onClick={handleRegisterTextButtonClick} style={{ transition: 'opacity 0.3s ease-in-out 0.5s' }}>{currentLanguage.registerTextButton}</button>
          </div>
        )}

        {showRegisterWindow && (
          <div className={`register-form-window ${isTransitioning ? 'fade-transition' : 'show'}`} style={{
            opacity: registerFormPosition.opacity,
            transform: registerFormPosition.transform,
            transition: 'opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s',
          }}>
            <h2 className={`fade-transition ${languageTransition ? 'fade-out' : ''}`}>{currentLanguage.registerTitle}</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input type="email" name="email" placeholder={currentLanguage.emailPlaceholder} required />
              <input type="text" name="fullName" placeholder={currentLanguage.fullNamePlaceholder} required />
              <input type="password" name="password" placeholder={currentLanguage.passwordPlaceholderReg} required />
              <input type="password" name="confirmPassword" placeholder={currentLanguage.confirmPasswordPlaceholder} required />
              <label className="privacy-policy-label">
                <input type="checkbox" name="privacyPolicy" required />
                <span className="privacy-policy-text">{currentLanguage.privacyPolicyCheckbox}</span>
              </label>
              <button type="submit" className="register-submit-button">{currentLanguage.registerSubmitButton}</button>
              <button type="button" className="back-to-login-button" onClick={handleBackToLogin}>{currentLanguage.loginTitle}</button>
            </form>
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
    </div>
  );
}

export default App;