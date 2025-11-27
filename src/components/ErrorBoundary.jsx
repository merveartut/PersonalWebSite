import React from 'react';
import { motion } from 'framer-motion';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  // Bir alt bileşende hata oluştuğunda state'i günceller
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Hata bilgisini loglamak için kullanılır
  componentDidCatch(error, errorInfo) {
    // Gerçek bir uygulamada, hatayı bir loglama hizmetine (Sentry, LogRocket vb.) göndermeniz gerekir.
    console.error("Component Hatası Yakalandı:", error, errorInfo);
    this.setState({
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Hata durumunda gösterilecek yedek UI (Fallback UI)
      return (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-red-900 text-white p-8">
            <motion.h1 
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                ⚠️ Bir Hata Oluştu!
            </motion.h1>
            <motion.p
                className="text-lg text-center mb-8 max-w-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                Üzgünüz, bir şeyler ters gitti. Lütfen sayfayı yenilemeyi deneyin. Sorun devam ederse lütfen bana ulaşın.
            </motion.p>
            
            {/* Geliştirme modu için detayları göster */}
            {process.env.NODE_ENV === 'development' && (
                <div className="mt-6 p-4 bg-red-800 rounded-lg max-h-60 overflow-y-auto w-full max-w-3xl font-mono text-sm">
                    <details>
                        <summary className="cursor-pointer font-semibold text-red-300">Detaylar (Sadece Geliştiriciler İçin)</summary>
                        <pre className="mt-2 whitespace-pre-wrap">
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </details>
                </div>
            )}

            <motion.button
                onClick={() => window.location.reload()}
                className="mt-8 px-6 py-3 bg-white text-red-900 font-semibold rounded-full hover:bg-gray-200 transition-colors shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                Sayfayı Yenile
            </motion.button>
        </div>
      );
    }

    // Normal durumda alt bileşenleri render et
    return this.props.children; 
  }
}

export default ErrorBoundary;