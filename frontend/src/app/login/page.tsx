'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/authService';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Lock, Mail, Shield, ChevronRight, Eye, EyeOff, 
  Sparkles, TrendingUp, BarChart3, Package, Users, 
  CheckCircle, AlertTriangle, Zap, ArrowDown, Brain, 
  Cpu, Database, Cloud, Award, Target, Link2, 
  DollarSign, Activity, ShoppingCart, CreditCard,
  Clock, TrendingDown, Monitor, Smartphone
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithAuthentik } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Referencias para las secciones
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const integrationsRef = useRef<HTMLDivElement>(null);

  // Función para scroll suave
  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.login({ email, password });
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 min-h-screen overflow-x-hidden">
      {/* Hero Section con Login */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Contenido central */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Lado izquierdo - Información */}
          <div className="flex-1 text-center lg:text-left px-4 sm:px-0">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">
              CuretCore
            </h1>
            <p className="text-lg sm:text-xl text-blue-200 mb-2">Sistema Integral Empresarial</p>
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-white/60 mb-4 sm:mb-8">
              <span className="text-sm">Powered by</span>
              <img src="/logo-white.png" alt="CuretCore" className="h-5 w-auto opacity-80" />
            </div>
            
            <p className="text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
              La plataforma más avanzada para la gestión empresarial moderna con
              <span className="text-yellow-400 font-semibold"> IA</span>, 
              <span className="text-green-400 font-semibold"> automatizaciones</span> y 
              <span className="text-purple-400 font-semibold"> análisis en tiempo real</span>
            </p>
            
            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mb-8 sm:mb-12">
              <button 
                onClick={() => scrollToSection(metricsRef)}
                className="group flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm sm:text-base text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <Activity className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2 text-yellow-400" />
                <span className="hidden sm:inline">Métricas en Vivo</span>
                <span className="sm:hidden">Métricas</span>
                <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => scrollToSection(featuresRef)}
                className="group flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm sm:text-base text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <Brain className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2 text-purple-400" />
                <span className="hidden sm:inline">IA Empresarial</span>
                <span className="sm:hidden">IA</span>
                <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button 
                onClick={() => scrollToSection(integrationsRef)}
                className="group flex items-center px-3 sm:px-6 py-2 sm:py-3 bg-white/10 backdrop-blur-sm rounded-full text-sm sm:text-base text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <Link2 className="w-4 sm:w-5 h-4 sm:h-5 mr-1 sm:mr-2 text-cyan-400" />
                Integraciones
                <ChevronRight className="w-3 sm:w-4 h-3 sm:h-4 ml-1 sm:ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
          
          {/* Lado derecho - Formulario de Login */}
          <div className="w-full max-w-md">
            <div className="bg-gray-800/95 rounded-2xl shadow-2xl p-8 border border-gray-700 backdrop-blur-sm">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white">Iniciar Sesión</h3>
                <p className="text-sm text-gray-400 mt-2">Accede a tu Sistema Integral</p>
              </div>
              
              <form className="space-y-4" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-900/20 border border-red-800 px-3 py-2 rounded-lg text-sm flex items-center text-red-400">
                    <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
                    {error}
                  </div>
                )}
                
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      required
                      className="appearance-none block w-full pl-9 pr-3 py-2.5 border border-gray-700 rounded-lg placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="correo@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      className="appearance-none block w-full pl-9 pr-9 py-2.5 border border-gray-700 rounded-lg placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-sm"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400 hover:text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Iniciar Sesión
                    </>
                  )}
                </button>
              </form>

              {/* SSO Button */}
              {process.env.NEXT_PUBLIC_AUTHENTIK_ENABLED === 'true' && (
                <div className="mt-4">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-gray-800 text-gray-400">O continúa con</span>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => loginWithAuthentik()}
                      disabled={isLoading}
                      className="w-full flex justify-center items-center px-4 py-2.5 bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg text-sm font-medium text-white transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4V17c0 4.52-3.15 8.75-8 9.88-4.85-1.13-8-5.36-8-9.88V8.18l8-4z" fill="currentColor"/>
                        <path d="M12 6l-5 2.5v6.5c0 3.14 2.18 6.08 5 6.93 2.82-.85 5-3.79 5-6.93V8.5L12 6z" fill="currentColor" opacity="0.5"/>
                      </svg>
                      Iniciar sesión con SSO
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button 
            onClick={() => scrollToSection(metricsRef)}
            className="p-2 text-white hover:text-yellow-400 transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </button>
        </div>
      </section>

      {/* Live Metrics Section */}
      <section ref={metricsRef} className="py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Métricas en Tiempo Real</h2>
            <p className="text-xl text-gray-300">Datos actualizados cada segundo de tu negocio</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Ventas del Día */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="w-8 h-8 opacity-80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">HOY</span>
              </div>
              <div className="text-3xl font-bold mb-1">RD$ 45,230</div>
              <div className="text-sm opacity-80 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +12.5% vs ayer
              </div>
            </div>
            
            {/* Órdenes */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <ShoppingCart className="w-8 h-8 opacity-80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">LIVE</span>
              </div>
              <div className="text-3xl font-bold mb-1">127</div>
              <div className="text-sm opacity-80">Órdenes procesadas</div>
            </div>
            
            {/* Ticket Promedio */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <CreditCard className="w-8 h-8 opacity-80" />
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">AVG</span>
              </div>
              <div className="text-3xl font-bold mb-1">RD$ 356</div>
              <div className="text-sm opacity-80">Ticket promedio</div>
            </div>
            
            {/* Clientes Activos */}
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <Users className="w-8 h-8 opacity-80" />
                <Activity className="w-4 h-4 animate-pulse" />
              </div>
              <div className="text-3xl font-bold mb-1">342</div>
              <div className="text-sm opacity-80">Clientes activos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Una Plataforma, Infinitas Posibilidades
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Integra todas las áreas de tu negocio en un solo lugar con tecnología de vanguardia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Inventario Inteligente</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Control multi-ubicación con alertas automáticas y predicciones de stock</p>
            </div>
            
            <div className="group p-6 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Análisis Tiempo Real</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Métricas y KPIs actualizados al instante con dashboards interactivos</p>
            </div>
            
            <div className="group p-6 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Gestión Integral</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Empleados, proveedores y finanzas unificadas en una sola vista</p>
            </div>
            
            <div className="group p-6 bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-yellow-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">ROI Optimizado</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">Maximiza la rentabilidad con insights accionables y recomendaciones IA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section ref={integrationsRef} className="py-20 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Link2 className="w-16 h-16 text-cyan-200 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Conecta con tus Herramientas Favoritas
            </h2>
            <p className="text-xl text-cyan-100 max-w-3xl mx-auto">
              Integración perfecta con las plataformas que ya usas
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center hover:bg-white/20 transition-colors">
              <span className="text-white font-semibold">Shopify</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center hover:bg-white/20 transition-colors">
              <span className="text-white font-semibold">Meta Ads</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center hover:bg-white/20 transition-colors">
              <span className="text-white font-semibold">Google Ads</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center hover:bg-white/20 transition-colors">
              <span className="text-white font-semibold">WhatsApp</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center hover:bg-white/20 transition-colors">
              <span className="text-white font-semibold">QuickBooks</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 flex items-center justify-center hover:bg-white/20 transition-colors">
              <span className="text-white font-semibold">API REST</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 CuretCore. Todos los derechos reservados.
          </p>
        </div>
      </footer>

      {/* CSS para animaciones */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}