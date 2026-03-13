import { useState, useEffect } from 'react';
import BlobCharacter from './BlobCharacter';
import LoginForm from './LoginForm';

function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showMobileWarning, setShowMobileWarning] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setShowMobileWarning(window.innerWidth <= 800);
    };

    // Check on first load
    checkScreenSize();

    // Listen for window resize events
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Track cursor position globally
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Handle touch movement for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="app-container">
      {/* Left side: Character animations */}
      <div className="blob-scene">
        <div className="characters-wrapper">
          <BlobCharacter 
            color="purple" 
            isPasswordVisible={isPasswordVisible} 
            mousePosition={mousePosition}
            isTyping={isTyping}
          />
          <BlobCharacter 
            color="black" 
            isPasswordVisible={isPasswordVisible} 
            mousePosition={mousePosition}
            isTyping={isTyping}
          />
          <BlobCharacter 
            color="orange" 
            isPasswordVisible={isPasswordVisible} 
            mousePosition={mousePosition}
            isTyping={isTyping}
          />
          <BlobCharacter 
            color="yellow" 
            isPasswordVisible={isPasswordVisible} 
            mousePosition={mousePosition}
            isTyping={isTyping}
          />
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="login-side">
        <LoginForm 
          isPasswordVisible={isPasswordVisible}
          setIsPasswordVisible={setIsPasswordVisible}
          setIsTyping={setIsTyping}
        />
      </div>

      {/* Mobile Warning Popup */}
      {showMobileWarning && (
        <div className="mobile-warning-overlay">
          <div className="mobile-warning-modal">
            <div className="modal-icon">👋</div>
            <h2>Best viewed on Desktop</h2>
            <p>Please view on a desktop your screen is small.</p>
            <button className="btn-primary" onClick={() => setShowMobileWarning(false)}>
              Continue Anyway
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
