<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moha Shop DZ - متجر شحن الألعاب</title>
    <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <style>
        :root {
            --primary: #7C3AED; --primary-light: #A78BFA; --primary-dark: #5B21B6;
            --secondary: #F59E0B; --secondary-light: #FCD34D;
            --dark: #0F0F1A; --darker: #080810; --card: #1A1A2E; --card-hover: #252542;
            --text: #E2E8F0; --text-muted: #94A3B8;
            --success: #10B981; --danger: #EF4444; --warning: #F59E0B; --info: #3B82F6;
            --border: rgba(255,255,255,0.08); --glass: rgba(26, 26, 46, 0.7);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Tajawal', sans-serif; background: var(--darker); color: var(--text); min-height: 100vh; overflow-x: hidden; line-height: 1.6; }
        .bg-animation { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; overflow: hidden; }
        .bg-animation::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle at 20% 80%, rgba(124,58,237,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,158,11,0.1) 0%, transparent 50%), radial-gradient(circle at 50% 50%, rgba(124,58,237,0.05) 0%, transparent 70%); animation: bgFloat 20s ease-in-out infinite; }
        @keyframes bgFloat { 0%,100% { transform: translate(0,0) rotate(0deg); } 33% { transform: translate(2%,2%) rotate(1deg); } 66% { transform: translate(-1%,1%) rotate(-1deg); } }
        .particles { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; overflow: hidden; }
        .particle { position: absolute; width: 4px; height: 4px; background: var(--primary-light); border-radius: 50%; opacity: 0.3; animation: particleFloat linear infinite; }
        @keyframes particleFloat { 0% { transform: translateY(100vh) rotate(0deg); opacity: 0; } 10% { opacity: 0.3; } 90% { opacity: 0.3; } 100% { transform: translateY(-100vh) rotate(720deg); opacity: 0; } }
        .header { background: var(--glass); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border); padding: 1rem 2rem; position: sticky; top: 0; z-index: 100; }
        .header-content { max-width: 1400px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .logo { display: flex; align-items: center; gap: 0.75rem; font-size: 1.5rem; font-weight: 900; color: var(--text); text-decoration: none; }
        .logo-icon { width: 45px; height: 45px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; box-shadow: 0 4px 15px rgba(124,58,237,0.4); }
        .nav-links { display: flex; gap: 2rem; list-style: none; }
        .nav-links a { color: var(--text-muted); text-decoration: none; font-weight: 500; transition: all 0.3s; position: relative; cursor: pointer; }
        .nav-links a:hover, .nav-links a.active { color: var(--text); }
        .nav-links a::after { content: ''; position: absolute; bottom: -5px; right: 0; width: 0; height: 2px; background: linear-gradient(90deg, var(--primary), var(--secondary)); transition: width 0.3s; }
        .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
        .header-actions { display: flex; gap: 1rem; align-items: center; }
        .user-info { display: flex; align-items: center; gap: 0.75rem; color: var(--text); }
        .user-avatar { width: 38px; height: 38px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 900; font-size: 1rem; }
        .btn { padding: 0.6rem 1.5rem; border-radius: 10px; border: none; font-family: 'Tajawal', sans-serif; font-weight: 700; font-size: 0.95rem; cursor: pointer; transition: all 0.3s; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; }
        .btn-primary { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: white; box-shadow: 0 4px 15px rgba(124,58,237,0.4); }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 6px 25px rgba(124,58,237,0.5); }
        .btn-outline { background: transparent; color: var(--text); border: 1px solid var(--border); }
        .btn-outline:hover { background: var(--card); border-color: var(--primary-light); }
        .btn-success { background: linear-gradient(135deg, var(--success), #059669); color: white; }
        .btn-danger { background: linear-gradient(135deg, var(--danger), #DC2626); color: white; }
        .btn-warning { background: linear-gradient(135deg, var(--warning), #D97706); color: white; }
        .btn-info { background: linear-gradient(135deg, var(--info), #2563EB); color: white; }
        .btn-sm { padding: 0.4rem 1rem; font-size: 0.85rem; }
        .btn-lg { padding: 0.8rem 2rem; font-size: 1.1rem; }
        .working-hours-banner { background: linear-gradient(90deg, rgba(16,185,129,0.15), rgba(59,130,246,0.15)); border: 1px solid rgba(16,185,129,0.3); border-radius: 16px; padding: 1rem 2rem; margin: 1.5rem auto; max-width: 1400px; display: flex; align-items: center; justify-content: space-between; backdrop-filter: blur(10px); }
        .working-hours-banner.closed { background: linear-gradient(90deg, rgba(239,68,68,0.15), rgba(245,158,11,0.15)); border-color: rgba(239,68,68,0.3); }
        .status-indicator { display: flex; align-items: center; gap: 0.75rem; }
        .status-dot { width: 12px; height: 12px; border-radius: 50%; position: relative; }
        .status-dot.open { background: var(--success); box-shadow: 0 0 10px var(--success), 0 0 20px var(--success); animation: pulse 2s infinite; }
        .status-dot.closed { background: var(--danger); box-shadow: 0 0 10px var(--danger); }
        @keyframes pulse { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.2); } }
        .status-text { font-weight: 700; font-size: 1.1rem; }
        .status-text.open { color: var(--success); }
        .status-text.closed { color: var(--danger); }
        .hours-info { display: flex; align-items: center; gap: 1.5rem; }
        .hours-info span { color: var(--text-muted); font-size: 0.9rem; }
        .hours-info i { color: var(--secondary); }
        .countdown-timer { background: var(--card); padding: 0.5rem 1rem; border-radius: 10px; font-family: 'Courier New', monospace; font-weight: 700; font-size: 1rem; color: var(--secondary); border: 1px solid var(--border); }
        .container { max-width: 1400px; margin: 0 aut
