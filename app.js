const express = require('express');

const app = express();

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    const currentTime = new Date().toLocaleString();

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>AWS CI/CD Pipeline Demo</title>
                <style>
                    :root {
                        --bg-primary: #041023;
                        --bg-secondary: #102956;
                        --surface: rgba(255, 255, 255, 0.08);
                        --surface-strong: rgba(255, 255, 255, 0.14);
                        --text: #e9f6ff;
                        --text-muted: rgba(233, 246, 255, 0.72);
                        --accent: #34d399;
                        --accent-soft: #22d3ee;
                        --border: rgba(255, 255, 255, 0.16);
                    }

                    * {
                        box-sizing: border-box;
                    }

                    body {
                        margin: 0;
                        min-height: 100vh;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        background: radial-gradient(circle at top left, rgba(34, 211, 238, 0.18), transparent 24%),
                                    radial-gradient(circle at bottom right, rgba(16, 185, 129, 0.14), transparent 20%),
                                    linear-gradient(135deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
                        color: var(--text);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 24px;
                    }

                    .page {
                        width: 100%;
                        max-width: 1060px;
                    }

                    .hero {
                        background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04));
                        border: 1px solid var(--border);
                        border-radius: 32px;
                        padding: 44px;
                        box-shadow: 0 26px 80px rgba(0, 0, 0, 0.28);
                        backdrop-filter: blur(14px);
                    }

                    header {
                        display: flex;
                        justify-content: space-between;
                        flex-wrap: wrap;
                        gap: 18px;
                        align-items: center;
                    }

                    .badge {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        padding: 12px 20px;
                        border-radius: 999px;
                        background: rgba(34, 211, 238, 0.16);
                        color: #c8fbff;
                        border: 1px solid rgba(34, 211, 238, 0.35);
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.08em;
                    }

                    .hero h1 {
                        margin: 0;
                        font-size: clamp(2.6rem, 5vw, 3.8rem);
                        line-height: 1.02;
                        letter-spacing: -0.05em;
                        max-width: 820px;
                    }

                    .hero p.lead {
                        margin: 20px 0 0;
                        font-size: 1.08rem;
                        line-height: 1.8;
                        color: var(--text-muted);
                        max-width: 780px;
                    }

                    .status-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
                        gap: 22px;
                        margin: 40px 0 12px;
                    }

                    .card {
                        background: var(--surface);
                        border: 1px solid var(--border);
                        border-radius: 24px;
                        padding: 28px;
                        min-height: 190px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
                    }

                    .card:hover {
                        transform: translateY(-6px);
                        background: var(--surface-strong);
                        border-color: rgba(34, 211, 238, 0.4);
                    }

                    .card h2 {
                        margin: 0 0 14px;
                        font-size: 1.15rem;
                        color: #d6f7ff;
                    }

                    .card p {
                        margin: 0;
                        color: var(--text-muted);
                        line-height: 1.75;
                    }

                    .pill {
                        display: inline-flex;
                        align-items: center;
                        padding: 10px 16px;
                        border-radius: 999px;
                        background: rgba(34, 211, 238, 0.14);
                        border: 1px solid rgba(34, 211, 238, 0.28);
                        color: #c8fbff;
                        font-weight: 700;
                        letter-spacing: 0.02em;
                        margin-top: 12px;
                    }

                    .pill.accent {
                        background: rgba(16, 185, 129, 0.18);
                        border-color: rgba(16, 185, 129, 0.3);
                    }

                    .status-tag {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                        padding: 10px 18px;
                        border-radius: 999px;
                        background: linear-gradient(135deg, rgba(16, 185, 129, 0.18), rgba(34, 211, 238, 0.14));
                        color: #d8fff6;
                        font-weight: 700;
                        text-transform: uppercase;
                        letter-spacing: 0.08em;
                    }

                    .footer {
                        margin-top: 32px;
                        padding-top: 26px;
                        border-top: 1px solid rgba(255, 255, 255, 0.08);
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        gap: 14px;
                        color: rgba(233, 246, 255, 0.72);
                        font-size: 0.96rem;
                    }

                    .footer span {
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .footer strong {
                        color: #f8fafc;
                    }

                    @media (max-width: 700px) {
                        .hero {
                            padding: 30px;
                        }

                        .hero h1 {
                            font-size: clamp(2.3rem, 8vw, 3rem);
                        }
                    }
                </style>
            </head>

            <body>
                <main class="page">
                    <section class="hero">
                        <header>
                            <div>
                                <div class="badge">AWS CI/CD Pipeline</div>
                                <h1>Deployment Dashboard</h1>
                            </div>
                            <div class="status-tag">Live</div>
                        </header>

                        <p class="lead">
                            Your Node.js app is deployed and running with a vibrant dashboard.
                            This demo shows an automated CI/CD pipeline using <strong>GitHub Actions</strong> and <strong>AWS EC2</strong>.
                        </p>

                        <div class="status-grid">
                            <article class="card">
                                <div>
                                    <h2>Application Status</h2>
                                    <p><strong>SUCCESS</strong> — The service is healthy and responding correctly.</p>
                                </div>
                                <span class="pill accent">Production Ready</span>
                            </article>

                            <article class="card">
                                <div>
                                    <h2>Platform</h2>
                                    <p>Hosted on AWS EC2 with automated deployment support.</p>
                                </div>
                                <span class="pill">Cloud Native</span>
                            </article>

                            <article class="card">
                                <div>
                                    <h2>CI/CD</h2>
                                    <p>Built and deployed automatically using GitHub Actions workflows.</p>
                                </div>
                                <span class="pill accent">Automated</span>
                            </article>

                            <article class="card">
                                <div>
                                    <h2>Backend</h2>
                                    <p>Powered by Node.js and Express with a responsive status UI.</p>
                                </div>
                                <span class="pill">Fast API</span>
                            </article>
                        </div>

                        <div class="footer">
                            <span>Live since: <strong>${currentTime}</strong></span>
                            <span>Health endpoint: <strong>/health</strong></span>
                        </div>
                    </section>
                </main>
            </body>
        </html>
    `);
});

app.get('/health', (req, res) => {
    res.json({
        status: 'UP',
        message: 'Application is running successfully'
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});