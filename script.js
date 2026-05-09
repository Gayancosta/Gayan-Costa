// Initialize Lucide icons
lucide.createIcons();

// ============================================
// SCROLL PROGRESS BAR
// ============================================
function updateProgressBar() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = scrollPercent + '%';
}

window.addEventListener('scroll', updateProgressBar);

// ============================================
// CURSOR GLOW EFFECT
// ============================================
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX - 16 + 'px';
    cursorGlow.style.top = e.clientY - 16 + 'px';
    cursorGlow.style.opacity = '0.8';
});
document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

// ============================================
// BACK TO TOP BUTTON
// ============================================
const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
    } else {
        backToTopBtn.classList.add('opacity-0', 'invisible');
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 60) {
        nav.style.borderBottomColor = 'rgba(255,255,255,0.1)';
        nav.style.background = 'rgba(10,10,12,0.98)';
    } else {
        nav.style.borderBottomColor = 'rgba(255,255,255,0.05)';
        nav.style.background = 'rgba(10,10,12,0.8)';
    }
});

// ============================================
// REVEAL ON SCROLL
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: unobserve after revealing for better performance
            // revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ============================================
// ANIMATED COUNTERS
// ============================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target > 10 ? '' : '%');
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current) + (target > 10 ? '' : '%');
        }
    }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter-value');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                animateCounter(counter, target);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.py-12.px-6.border-y');
if (statsSection) counterObserver.observe(statsSection);

// ============================================
// SKILL BAR ANIMATION
// ============================================
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.skill-bar').forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = width + '%';
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.getElementById('skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ============================================
// ACTIVE NAV LINK HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('text-white');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('text-white');
                }
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

// ============================================
// EDUCATION & PUBLICATION MODALS
// ============================================

const educationModal = document.getElementById('educationModal');
const publicationModal = document.getElementById('publicationModal');
const closeEduModal = document.getElementById('closeEduModal');
const closeEduBtn = document.getElementById('closeEduBtn');
const closePublicationModal = document.getElementById('closePublicationModal');
const closePublicationBtn = document.getElementById('closePublicationBtn');
const viewPublicationBtn = document.getElementById('viewPublicationBtn');

// Education Data Database
const educationDatabase = {
    'kingston-msc': {
        title: 'Network & Information Security',
        university: 'University of Kingston — Esoft Metro Campus',
        degree: 'Master of Science (MSc)',
        year: '2025',
        grade: 'Distinction Pass',
        research: 'Designing a Blockchain-Powered Healthcare Data Management System for Enhanced Security and Privacy',
        publicationId: 'kingston-research'
    },
    'bedford-bsc': {
        title: 'Computer Networking',
        university: 'University of Bedfordshire — SLIIT Academy',
        degree: 'Bachelor of Science (Honours)',
        year: '2023',
        grade: 'Second Class, Upper Division',
        research: 'A Secure Network and Automating the Device Configuration',
        publicationId: 'bedford-research'
    }
};

// Publications Data Database
const publicationsDatabase = {
    'kingston-research': {
        title: 'Designing a Blockchain-Powered Healthcare Data Management System for Enhanced Security and Privacy',
        description: 'This research explores the integration of blockchain technology with healthcare data management systems, focusing on enhanced security protocols and privacy preservation. The thesis demonstrates how distributed ledger technology can address current healthcare infrastructure vulnerabilities.',
        venue: 'ACCIMT (Association for Computing & Information Technology)',
        year: '2025',
        focus: [
            'Blockchain Architecture & Implementation',
            'Healthcare Data Security Standards',
            'Privacy-Preserving Encryption Methods',
            'Distributed Ledger Technology',
            'HIPAA & GDPR Compliance'
        ]
    },
    'bedford-research': {
        title: 'A Secure Network and Automating the Device Configuration',
        description: 'This thesis focuses on developing secure network architectures with automated device configuration management. The research addresses enterprise network security challenges through innovative automation strategies and security hardening techniques.',
        venue: 'University of Bedfordshire Research Database',
        year: '2023',
        focus: [
            'Network Security Architecture',
            'Automated Device Configuration',
            'Infrastructure Hardening',
            'Security Policy Implementation',
            'Enterprise Network Management'
        ]
    }
};

// Current publication being viewed (for cross-modal navigation)
let currentPublicationId = null;

// Open Education Modal
function openEducationModal(educationId) {
    const edu = educationDatabase[educationId];
    if (edu) {
        currentPublicationId = edu.publicationId;
        document.getElementById('eduTitle').textContent = edu.title;
        document.getElementById('eduUniversity').textContent = edu.university;
        document.getElementById('eduDegree').textContent = edu.degree;
        document.getElementById('eduYear').textContent = edu.year;
        document.getElementById('eduGrade').textContent = edu.grade;
        document.getElementById('eduResearch').textContent = edu.research;
        
        educationModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Close Education Modal
function closeEducationModalWindow() {
    educationModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Open Publication Modal
function openPublicationModal(publicationId, event) {
    if (event) event.stopPropagation();
    
    const pub = publicationsDatabase[publicationId];
    if (pub) {
        currentPublicationId = publicationId;
        document.getElementById('pubTitle').textContent = pub.title;
        document.getElementById('pubDescription').textContent = pub.description;
        document.getElementById('pubVenue').textContent = pub.venue;
        document.getElementById('pubYear').textContent = pub.year;
        
        // Populate focus areas list
        const focusList = document.getElementById('pubFocus');
        focusList.innerHTML = '';
        pub.focus.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="text-blue-400 font-semibold">•</span> ${item}`;
            focusList.appendChild(li);
        });
        
        publicationModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// Close Publication Modal
function closePublicationModalWindow() {
    publicationModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// Event Listeners
closeEduModal.addEventListener('click', closeEducationModalWindow);
closeEduBtn.addEventListener('click', closeEducationModalWindow);

closePublicationModal.addEventListener('click', closePublicationModalWindow);
closePublicationBtn.addEventListener('click', closePublicationModalWindow);

viewPublicationBtn.addEventListener('click', () => {
    closeEducationModalWindow();
    if (currentPublicationId) {
        setTimeout(() => {
            openPublicationModal(currentPublicationId);
        }, 300);
    }
});

// Close modals when clicking outside
educationModal.addEventListener('click', (e) => {
    if (e.target === educationModal) closeEducationModalWindow();
});

publicationModal.addEventListener('click', (e) => {
    if (e.target === publicationModal) closePublicationModalWindow();
});

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (!educationModal.classList.contains('hidden')) closeEducationModalWindow();
        if (!publicationModal.classList.contains('hidden')) closePublicationModalWindow();
    }
});

// ============================================

const articleModal = document.getElementById('articleModal');
const closeArticleModal = document.getElementById('closeArticleModal');
const closeArticleBtn = document.getElementById('closeArticleBtn');
const articleContent = document.getElementById('articleContent');

// Comprehensive Article Database
const articlesData = {
    'azure-ad-writeback': {
        title: 'Fixing Azure AD Password Writeback Errors',
        category: 'Azure AD',
        categoryColor: 'blue',
        date: 'March 2026',
        readTime: '8 min read',
        content: `
            <div class="article-section">
                <h2>Fixing Azure AD Password Writeback Errors</h2>
                <p>Password Writeback is a critical component in hybrid identity environments, allowing users to reset their passwords in the cloud while having those changes immediately reflected in your on-premises Active Directory. However, configuration challenges can lead to synchronization failures and user frustration. This comprehensive guide addresses the most common Password Writeback errors and provides step-by-step solutions.</p>
            </div>

            <div class="article-section">
                <h2>Understanding Password Writeback Architecture</h2>
                <p>Before troubleshooting, it's essential to understand how Password Writeback functions:</p>
                <ul>
                    <li>User initiates password reset in Azure AD or Office 365 portal</li>
                    <li>Azure AD validates the request and generates a temporary password</li>
                    <li>Azure AD Connect service bus relays the reset to on-premises AD</li>
                    <li>On-premises domain controller processes and applies the change</li>
                    <li>Confirmation is sent back through Azure AD</li>
                </ul>
                <p>Any failure in this chain results in a writeback error. Let's examine the most common issues.</p>
            </div>

            <div class="article-section">
                <h2>Common Error Codes and Solutions</h2>
                
                <h3>Error 1: "The password does not meet the password policy requirements"</h3>
                <p>This is the most frequently encountered error. It occurs when the password meets Azure AD requirements but fails on-premises AD complexity rules.</p>
                <div class="article-highlight">
                    <p><strong>Solution:</strong> Align your on-premises AD password policy with Azure AD requirements. Verify that your domain policy allows passwords that Azure AD has accepted.</p>
                </div>

                <h3>Error 2: "Password Writeback connector is unavailable"</h3>
                <p>This error indicates communication failure between Azure AD Connect and your on-premises environment.</p>
                <div class="article-code">
                    <code># Check Azure AD Connect Synchronization Service on the AADConnect server
# Open Services.msc on your AADConnect server
# Verify these services are running:
# - Azure AD Connect Synchronization Service (ADSync)
# - Azure AD Connect Notification Service (HealthSync)

# Restart the service if needed
net stop ADSync
net start ADSync
                    </code>
                </div>

                <h3>Error 3: "Agent error: Unable to connect"</h3>
                <p>The Password Writeback agent cannot establish a connection to the service bus.</p>
                <ul>
                    <li>Verify firewall rules allow outbound HTTPS connections to *.servicebus.windows.net:443</li>
                    <li>Check proxy configuration on the Azure AD Connect server</li>
                    <li>Run: <code>Test-AzureADPasswordResetPolicyValidation</code> PowerShell cmdlet</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Prerequisites Checklist</h2>
                <p>Before implementing Password Writeback, ensure the following are in place:</p>
                <ul>
                    <li>Azure AD Premium P1 or P2 license</li>
                    <li>Azure AD Connect version 1.2.65.0 or later</li>
                    <li>Network connectivity on port 443 to *.servicebus.windows.net</li>
                    <li>At least one domain controller running Windows Server 2012 or later</li>
                    <li>Service account with sufficient permissions in on-premises AD</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Step-by-Step Troubleshooting Process</h2>
                
                <h3>Step 1: Enable Password Writeback in Azure AD Connect</h3>
                <p>Run Azure AD Connect and navigate to the Optional Features page. Ensure "Password Writeback" is checked and properly configured.</p>

                <h3>Step 2: Verify Service Account Permissions</h3>
                <p>The service account running Password Writeback requires specific permissions. Grant these Active Directory permissions:</p>
                <ul>
                    <li>Reset Password</li>
                    <li>Modify user object properties</li>
                    <li>Unlock account</li>
                </ul>

                <h3>Step 3: Check Network Connectivity</h3>
                <div class="article-code">
                    <code># Test connectivity to Azure Service Bus
Test-NetConnection -ComputerName *.servicebus.windows.net -Port 443

# If blocked, verify firewall rules allow outbound HTTPS
netsh advfirewall show allprofiles
                    </code>
                </div>

                <h3>Step 4: Review Event Logs</h3>
                <p>Check Event Viewer on your Azure AD Connect server under Applications and Services Logs > Azure AD Connect Synchronization > Password Writeback for detailed error information.</p>
            </div>

            <div class="article-section">
                <h2>Best Practices for Password Writeback</h2>
                <ul>
                    <li><strong>Regular Testing:</strong> Periodically test password resets in a non-production environment</li>
                    <li><strong>Monitoring:</strong> Enable Azure AD Connect Health monitoring for Password Writeback</li>
                    <li><strong>Policy Alignment:</strong> Keep on-premises and cloud password policies synchronized</li>
                    <li><strong>Account Lockout Sync:</strong> Enable account lockout synchronization alongside password writeback</li>
                    <li><strong>Backup Connectivity:</strong> Maintain redundancy with multiple Azure AD Connect servers</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Conclusion</h2>
                <p>Password Writeback is a powerful feature for enterprise hybrid environments, but requires careful configuration and monitoring. By following this troubleshooting guide and maintaining proper prerequisites, you'll ensure seamless password reset experiences for your users. Remember that most issues stem from configuration mismatches or network connectivity problems—addressing these fundamentals typically resolves 95% of Password Writeback errors.</p>
            </div>
        `
    },

    'azure-regions-cost': {
        title: 'Best Azure Regions for Cost Optimization',
        category: 'Cost Optimization',
        categoryColor: 'purple',
        date: 'February 2026',
        readTime: '10 min read',
        content: `
            <div class="article-section">
                <h2>Best Azure Regions for Cost Optimization</h2>
                <p>Cloud infrastructure costs represent a significant portion of enterprise IT budgets. By strategically selecting Azure regions, organizations can optimize expenses without compromising performance. This guide explores region selection strategies and provides data-driven recommendations for cost-conscious deployments.</p>
            </div>

            <div class="article-section">
                <h2>Azure Pricing Dynamics Across Regions</h2>
                <p>Azure pricing varies significantly by region due to factors including local infrastructure costs, electricity pricing, labor costs, and regional demand. Understanding these variables enables informed deployment decisions.</p>
                <p><strong>Key Pricing Variations:</strong></p>
                <ul>
                    <li>Compute pricing can differ by 30-40% between regions</li>
                    <li>Data egress charges apply when data moves between regions</li>
                    <li>Premium features have different availability across regions</li>
                    <li>Committed use discounts vary by region</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Most Cost-Effective Azure Regions</h2>
                
                <h3>1. Southeast Asia (Singapore)</h3>
                <p>Southeast Asia offers competitive pricing with proximity to APAC markets. Ideal for organizations serving India, Southeast Asia, and Oceania regions without the premium pricing of neighboring areas.</p>

                <h3>2. East US (Virginia)</h3>
                <p>The most established US region with mature infrastructure and highest competition among providers. Offers the lowest compute costs in North America.</p>

                <h3>3. North Europe (Ireland)</h3>
                <p>EU organizations find North Europe competitive, particularly for GDPR-compliant workloads. Better pricing than West Europe while maintaining regional proximity.</p>

                <h3>4. Canada Central</h3>
                <p>Surprisingly cost-effective for North American deployments while offering data residency benefits for Canadian organizations.</p>
            </div>

            <div class="article-section">
                <h2>Strategies for Maximum Cost Optimization</h2>
                
                <h3>Strategy 1: Multi-Region Deployment Optimization</h3>
                <p>Deploy primary workloads in cost-optimized regions while using more expensive regions only for disaster recovery. This approach reduces overall costs while maintaining redundancy.</p>

                <h3>Strategy 2: Reserved Instance Purchasing</h3>
                <p>Commit to 1-year or 3-year reservations in optimal regions for 20-35% savings. Best for predictable, long-term workloads.</p>

                <h3>Strategy 3: Spot Instances for Non-Critical Workloads</h3>
                <p>Use Azure Spot VMs for batch processing, testing, and development environments. Achieve up to 90% discounts compared to regular pricing.</p>

                <h3>Strategy 4: Data Transfer Optimization</h3>
                <p>Minimize data egress charges by:</p>
                <ul>
                    <li>Keeping data within the same region where possible</li>
                    <li>Using Azure Content Delivery Network for efficient distribution</li>
                    <li>Implementing data locality strategies</li>
                    <li>Leveraging ExpressRoute for predictable transfer costs</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Regional Cost Comparison Table</h2>
                <p style="text-align: center; color: #94a3b8; font-style: italic;">VM Pricing (Standard_D2s_v3 annual commitment)</p>
                <div class="article-table">
                    <table>
                        <tr>
                            <th>Region</th>
                            <th>Annual Cost</th>
                            <th>Monthly Cost</th>
                            <th>Relative Cost</th>
                        </tr>
                        <tr>
                            <td>East US</td>
                            <td>$1,248</td>
                            <td>$104</td>
                            <td>Base</td>
                        </tr>
                        <tr>
                            <td>Southeast Asia</td>
                            <td>$1,512</td>
                            <td>$126</td>
                            <td>+21%</td>
                        </tr>
                        <tr>
                            <td>West Europe</td>
                            <td>$1,680</td>
                            <td>$140</td>
                            <td>+35%</td>
                        </tr>
                        <tr>
                            <td>Japan East</td>
                            <td>$1,800</td>
                            <td>$150</td>
                            <td>+44%</td>
                        </tr>
                    </table>
                </div>
            </div>

            <div class="article-section">
                <h2>Practical Implementation Recommendations</h2>
                <ul>
                    <li><strong>Baseline Workloads:</strong> Deploy to East US with reserved instances</li>
                    <li><strong>Regional Presence:</strong> Use local regions only where necessary</li>
                    <li><strong>Disaster Recovery:</strong> Place DR in secondary regions, optimize for cost</li>
                    <li><strong>Development/Test:</strong> Use low-cost regions with spot instances</li>
                    <li><strong>Data Analytics:</strong> Leverage region pricing when choosing data warehouse locations</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Monitoring and Optimization Tools</h2>
                <p>Utilize Azure Cost Management to continuously monitor regional spending, set budgets, and receive alerts. Use the pricing calculator to simulate different region scenarios before deployment.</p>
            </div>
        `
    },

    'windows-hardening': {
        title: 'Windows Server Security Hardening Guide',
        category: 'Security',
        categoryColor: 'red',
        date: 'January 2026',
        readTime: '12 min read',
        content: `
            <div class="article-section">
                <h2>Windows Server Security Hardening Guide</h2>
                <p>Windows Server hardening is a critical foundation for enterprise security. This comprehensive guide provides actionable steps to reduce attack surface, implement security controls, and maintain compliance with industry standards. Whether you're securing a single server or managing enterprise infrastructure, these practices will strengthen your security posture.</p>
            </div>

            <div class="article-section">
                <h2>Core Hardening Principles</h2>
                <p>Effective hardening follows these principles:</p>
                <ul>
                    <li><strong>Least Privilege:</strong> Grant only necessary permissions</li>
                    <li><strong>Defense in Depth:</strong> Multiple layers of security controls</li>
                    <li><strong>Configuration Management:</strong> Centralized, auditable settings</li>
                    <li><strong>Continuous Monitoring:</strong> Real-time threat detection</li>
                    <li><strong>Rapid Response:</strong> Quick patching and incident response</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Phase 1: Initial Configuration</h2>
                
                <h3>1. Disable Unnecessary Services</h3>
                <p>Reduce attack surface by disabling unused services. Use Group Policy or PowerShell to disable:</p>
                <div class="article-code">
                    <code># Disable unnecessary services
Get-Service | Where-Object {$_.StartType -eq 'Automatic' -and $_.Name -like 'telemetry'} | Disable-NetAdapter

# Services to consider disabling:
# - BITS (Background Intelligent Transfer Service)
# - Print Spooler (if not needed)
# - RPC over HTTP (if not required)
# - Unnecessary role services
                    </code>
                </div>

                <h3>2. Windows Firewall Configuration</h3>
                <p>Implement strict firewall rules following the principle of deny-by-default.</p>
                <ul>
                    <li>Enable Windows Defender Firewall for all profiles (Domain, Private, Public)</li>
                    <li>Block inbound traffic by default</li>
                    <li>Allow only necessary outbound traffic</li>
                    <li>Enable Windows Firewall logging</li>
                </ul>

                <h3>3. Apply Microsoft Security Baselines</h3>
                <p>Microsoft Security Baselines provide recommended security settings based on enterprise testing and threat intelligence. Download and apply the appropriate baseline for your environment.</p>
            </div>

            <div class="article-section">
                <h2>Phase 2: Access Control Hardening</h2>
                
                <h3>Implement Local Admin Password Solution (LAPS)</h3>
                <p>LAPS manages local administrator account passwords to prevent lateral movement attacks.</p>
                <div class="article-code">
                    <code># Deploy LAPS using Group Policy
# 1. Download LAPS installer
# 2. Deploy via Group Policy or manual installation
# 3. Configure password complexity and expiration

# Verify LAPS deployment
Get-LapsADComputerSetting -Identity "ComputerName"
                    </code>
                </div>

                <h3>User Access Control (UAC) Enforcement</h3>
                <p>Keep UAC enabled and set to "Always Notify" in high-security environments. This prompts elevation requests for all administrative actions.</p>

                <h3>Account Lockout Policy</h3>
                <p>Implement account lockout to prevent brute force attacks:</p>
                <ul>
                    <li>Account lockout duration: 30 minutes</li>
                    <li>Account lockout threshold: 5 failed attempts</li>
                    <li>Reset account lockout counter after: 30 minutes</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Phase 3: Network Security</h2>
                
                <h3>Network Segmentation</h3>
                <p>Isolate critical servers using VLANs, subnets, and network access controls. Implement microsegmentation for zero-trust architecture.</p>

                <h3>SMB Security Hardening</h3>
                <div class="article-code">
                    <code># Disable SMB v1 (legacy protocol)
Set-SmbServerConfiguration -EnableSMB1Protocol $false

# Require SMB signing
Set-SmbServerConfiguration -RequireSecuritySignature $true

# Disable null sessions
Set-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters" -Name "RestrictNullSessAccess" -Value 1
                    </code>
                </div>

                <h3>RDP Hardening</h3>
                <p>If Remote Desktop is required:</p>
                <ul>
                    <li>Change default RDP port (3389) to non-standard port</li>
                    <li>Disable Network Level Authentication (NLA) bypass</li>
                    <li>Require strong encryption for RDP connections</li>
                    <li>Implement IP whitelisting</li>
                    <li>Consider using Azure Bastion for RDP access</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Phase 4: Auditing and Logging</h2>
                
                <h3>Enable Advanced Audit Policy</h3>
                <p>Configure comprehensive audit logging to detect suspicious activity:</p>
                <ul>
                    <li>Account Logon Events</li>
                    <li>Privilege Use</li>
                    <li>Process Tracking</li>
                    <li>File/Folder Access</li>
                    <li>Object Access</li>
                </ul>

                <h3>Centralized Log Management</h3>
                <p>Forward all Windows Event Logs to a centralized SIEM or log management solution for analysis and incident response.</p>

                <h3>PowerShell Script Block Logging</h3>
                <p>Enable PowerShell logging to capture executed scripts and commands for forensic analysis:</p>
                <div class="article-code">
                    <code># Enable PowerShell Script Block Logging
$regPath = "HKLM:\Software\Policies\Microsoft\Windows\PowerShell\ScriptBlockLogging"
New-Item -Path $regPath -Force | Out-Null
Set-ItemProperty -Path $regPath -Name "EnableScriptBlockLogging" -Value 1
                    </code>
                </div>
            </div>

            <div class="article-section">
                <h2>Phase 5: Patch and Update Management</h2>
                
                <h3>Automated Patching Strategy</h3>
                <ul>
                    <li>Enable Windows Update with automatic installation</li>
                    <li>Configure WSUS for centralized patch management</li>
                    <li>Implement monthly patching cycles</li>
                    <li>Maintain emergency patching procedures</li>
                </ul>

                <h3>Vulnerability Assessment</h3>
                <p>Regularly scan for vulnerabilities using:</p>
                <ul>
                    <li>Microsoft Baseline Security Analyzer (MBSA)</li>
                    <li>Qualys or Tenable vulnerability scanners</li>
                    <li>ManageEngine Vulnerability Manager</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Maintenance and Monitoring</h2>
                <p>Security hardening is not a one-time task. Regularly review and update security configurations, monitor for policy violations, and adapt to emerging threats. Implement a quarterly security review process to ensure continued effectiveness of your hardening efforts.</p>
            </div>
        `
    },

    'm365-migration': {
        title: 'M365 Tenant Migration Checklist',
        category: 'M365',
        categoryColor: 'indigo',
        date: 'December 2025',
        readTime: '9 min read',
        content: `
            <div class="article-section">
                <h2>M365 Tenant Migration Checklist</h2>
                <p>Migrating to a new Microsoft 365 tenant is a complex undertaking that requires meticulous planning and execution. This checklist ensures zero-downtime migration while maintaining data integrity and user productivity. Whether consolidating tenants or implementing a new M365 environment, this guide provides a comprehensive roadmap.</p>
            </div>

            <div class="article-section">
                <h2>Pre-Migration Phase (Weeks 1-2)</h2>
                
                <h3>Planning and Assessment</h3>
                <ul>
                    <li>☐ Define migration scope and timeline</li>
                    <li>☐ Identify all M365 workloads (Teams, Exchange, SharePoint, OneDrive)</li>
                    <li>☐ Audit current tenant configuration and customizations</li>
                    <li>☐ Document Active Directory structure and synchronization</li>
                    <li>☐ List all third-party integrations and dependencies</li>
                    <li>☐ Establish success criteria and KPIs</li>
                </ul>

                <h3>Stakeholder Alignment</h3>
                <ul>
                    <li>☐ Identify project stakeholders and communication channels</li>
                    <li>☐ Create communication timeline (executive updates, team briefings)</li>
                    <li>☐ Schedule user training sessions</li>
                    <li>☐ Define roles and responsibilities</li>
                </ul>

                <h3>Infrastructure Preparation</h3>
                <ul>
                    <li>☐ Provision new M365 tenant and licenses</li>
                    <li>☐ Configure Azure AD Connect with appropriate sync scope</li>
                    <li>☐ Set up Azure AD Connect Health monitoring</li>
                    <li>☐ Verify network connectivity and bandwidth</li>
                    <li>☐ Configure DNS records and SPF/DKIM/DMARC</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Email Migration Phase (Weeks 3-4)</h2>
                
                <h3>Coexistence Setup</h3>
                <ul>
                    <li>☐ Configure hybrid Exchange environment</li>
                    <li>☐ Set up mail routing between old and new tenant</li>
                    <li>☐ Configure free/busy sharing</li>
                    <li>☐ Update DNS MX records (staged approach)</li>
                </ul>

                <h3>Mailbox Migration</h3>
                <ul>
                    <li>☐ Create migration batches (pilot group first)</li>
                    <li>☐ Test migration with 5-10 pilot users</li>
                    <li>☐ Monitor migration statistics and troubleshoot issues</li>
                    <li>☐ Migrate in waves (25% first week, 50% second week, 25% final week)</li>
                    <li>☐ Enable Outlook sync and test client connectivity</li>
                </ul>

                <h3>Mailbox Validation</h3>
                <ul>
                    <li>☐ Verify all mail is delivered to new tenant</li>
                    <li>☐ Confirm calendar sharing works correctly</li>
                    <li>☐ Test distribution groups and mail-enabled rooms</li>
                    <li>☐ Validate archive mailboxes if applicable</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Data Migration Phase (Weeks 5-6)</h2>
                
                <h3>OneDrive Migration</h3>
                <ul>
                    <li>☐ Enable OneDrive for migrating users</li>
                    <li>☐ Configure OneDrive known folder redirection</li>
                    <li>☐ Use SharePoint Migration Tool or FastTrack service</li>
                    <li>☐ Migrate user files with preserved permissions</li>
                </ul>

                <h3>SharePoint Site Migration</h3>
                <ul>
                    <li>☐ Document all current SharePoint sites and configurations</li>
                    <li>☐ Create site collection hierarchy in new tenant</li>
                    <li>☐ Migrate site content using built-in tools</li>
                    <li>☐ Test custom solutions and web parts</li>
                    <li>☐ Validate permissions and security groups</li>
                </ul>

                <h3>Teams and Collaboration</h3>
                <ul>
                    <li>☐ Create Teams in new tenant mirroring old structure</li>
                    <li>☐ Migrate Teams channel content</li>
                    <li>☐ Export and import Teams chat history if needed</li>
                    <li>☐ Configure team owners and member permissions</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Application and Integration Migration</h2>
                
                <h3>Hybrid Applications</h3>
                <ul>
                    <li>☐ Reconfigure hybrid cloud applications (Dynamics 365, etc.)</li>
                    <li>☐ Update OAuth configurations</li>
                    <li>☐ Test application functionality post-migration</li>
                </ul>

                <h3>Third-Party Integrations</h3>
                <ul>
                    <li>☐ Update API endpoints in external applications</li>
                    <li>☐ Reconfigure Zapier, Power Automate, or similar tools</li>
                    <li>☐ Test all integrations in staging before production</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Cutover and Validation (Final Week)</h2>
                
                <h3>Pre-Cutover Checklist</h3>
                <ul>
                    <li>☐ Backup all data from source environment</li>
                    <li>☐ Schedule cutover window with minimal business impact</li>
                    <li>☐ Brief support team on new environment</li>
                    <li>☐ Prepare rollback procedures</li>
                </ul>

                <h3>DNS Cutover</h3>
                <ul>
                    <li>☐ Update MX records to new tenant</li>
                    <li>☐ Update SPF records</li>
                    <li>☐ Update CNAME records for Outlook autodiscovery</li>
                    <li>☐ Allow DNS propagation (monitor with nslookup)</li>
                </ul>

                <h3>Post-Cutover Validation</h3>
                <ul>
                    <li>☐ Verify all users can access new tenant</li>
                    <li>☐ Test email delivery internally and externally</li>
                    <li>☐ Confirm calendar and schedule visibility</li>
                    <li>☐ Validate Teams, SharePoint, and OneDrive access</li>
                    <li>☐ Check device enrollment status (Intune)</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Post-Migration (Ongoing)</h2>
                <ul>
                    <li>☐ Monitor Azure AD Connect synchronization</li>
                    <li>☐ Review M365 health and admin center alerts</li>
                    <li>☐ Decommission old tenant after validation period (30 days)</li>
                    <li>☐ Document lessons learned and update runbooks</li>
                    <li>☐ Provide post-migration training and support</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Key Success Factors</h2>
                <ul>
                    <li><strong>Planning:</strong> Thorough pre-migration assessment prevents surprises</li>
                    <li><strong>Communication:</strong> Regular updates keep stakeholders informed</li>
                    <li><strong>Testing:</strong> Pilot migrations identify and resolve issues early</li>
                    <li><strong>Phased Approach:</strong> Gradual migration reduces risk and impact</li>
                    <li><strong>Monitoring:</strong> Continuous observation ensures smooth operations</li>
                </ul>
            </div>
        `
    },

    'sophos-troubleshooting': {
        title: 'Sophos Performance Troubleshooting',
        category: 'Troubleshooting',
        categoryColor: 'cyan',
        date: 'November 2025',
        readTime: '11 min read',
        content: `
            <div class="article-section">
                <h2>Sophos Performance Troubleshooting</h2>
                <p>Sophos endpoint security is mission-critical for enterprise protection, but performance degradation can impact user productivity. This guide provides advanced troubleshooting techniques to identify bottlenecks, optimize configurations, and maintain security without sacrificing performance.</p>
            </div>

            <div class="article-section">
                <h2>Understanding Sophos Performance Metrics</h2>
                
                <h3>Key Performance Indicators</h3>
                <ul>
                    <li><strong>CPU Utilization:</strong> Excessive scanning or update processes</li>
                    <li><strong>Memory Usage:</strong> Bloated cache or memory leaks</li>
                    <li><strong>Disk I/O:</strong> Real-time scanning overhead</li>
                    <li><strong>Network Bandwidth:</strong> Frequent communication with management console</li>
                </ul>

                <h3>Baseline Metrics</h3>
                <p>Healthy Sophos systems should maintain:</p>
                <ul>
                    <li>CPU: 2-5% during normal operations</li>
                    <li>Memory: 150-300 MB resident set</li>
                    <li>Disk I/O: Minimal except during scheduled scans</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Diagnostic Data Collection</h2>
                
                <h3>Sophos Central Health Status</h3>
                <div class="article-code">
                    <code># Check Sophos service status on Windows
# Open Services.msc and verify:
# - Sophos Clean Service is running
# - Sophos Agent Service is running
# - Sophos Update Manager is running

# Or use PowerShell:
Get-Service | Where-Object {$_.Name -like '*Sophos*'} | Select-Object Name,Status,StartType
                    </code>
                </div>

                <h3>Event Log Analysis</h3>
                <p>Review Sophos-generated events in Event Viewer:</p>
                <ul>
                    <li>Applications and Services Logs > Sophos</li>
                    <li>Look for warnings and errors</li>
                    <li>Filter by timeframe when performance degradation occurred</li>
                </ul>

                <h3>Performance Monitor Counters</h3>
                <p>Create a custom Performance Monitor for Sophos processes:</p>
                <div class="article-code">
                    <code>perfmon.msc

Add these counters:
- Process > % Processor Time (SophosClean.exe, SophosAgent.exe)
- Process > Working Set (Memory usage)
- Process > I/O Data Operations/sec (Disk activity)
                    </code>
                </div>
            </div>

            <div class="article-section">
                <h2>Common Performance Issues and Solutions</h2>
                
                <h3>Issue 1: High CPU Usage During Scans</h3>
                <p><strong>Cause:</strong> Full system scan running during business hours</p>
                <div class="article-highlight">
                    <p><strong>Solution:</strong> Reschedule scans to off-hours, reduce scan priority, or exclude frequently accessed folders that don't require scanning.</p>
                </div>

                <h3>Issue 2: Excessive Memory Consumption</h3>
                <p><strong>Cause:</strong> Large exclusion lists or memory leak</p>
                <div class="article-code">
                    <code># Check Sophos cache and memory usage
# From Sophos Central: Settings > Threat Protection > Advanced Settings

# Recommended adjustments:
# - Reduce cache size if over 500MB
# - Review exclusion list for bloated patterns
# - Enable memory optimization
                    </code>
                </div>

                <h3>Issue 3: File Access Delays</h3>
                <p><strong>Cause:</strong> Real-time scanning overhead on file operations</p>
                <ul>
                    <li>Exclude directories with high I/O activity</li>
                    <li>Exclude file types not requiring scanning (databases, ISOs)</li>
                    <li>Enable PUA detection selectively on critical machines only</li>
                </ul>

                <h3>Issue 4: Intermittent System Freezes</h3>
                <p><strong>Cause:</strong> Conflicting services or incompatible drivers</p>
                <ul>
                    <li>Check for driver compatibility issues</li>
                    <li>Verify no duplicate security software</li>
                    <li>Review recent Windows or application updates</li>
                    <li>Check for DLL injection conflicts</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Optimization Strategies</h2>
                
                <h3>Exclusion Best Practices</h3>
                <p>Strategic exclusions improve performance without compromising security:</p>
                <ul>
                    <li>Exclude high-traffic database folders</li>
                    <li>Exclude development directories (.tmp, .obj, build output)</li>
                    <li>Exclude legitimate enterprise applications after validation</li>
                    <li>Use folder-level exclusions rather than file patterns</li>
                    <li>Document all exclusions for compliance audits</li>
                </ul>

                <h3>Scan Schedule Optimization</h3>
                <div class="article-code">
                    <code># Recommended scan schedule:
# - Quick scans: Daily at 2 AM
# - Full scans: Weekly at 3 AM
# - PUA scans: Weekly at 4 AM

# Stagger scans across devices to prevent network congestion
# Use maintenance windows for critical production systems
                    </code>
                </div>

                <h3>Real-Time Protection Tuning</h3>
                <ul>
                    <li>Disable on-access scanning for non-critical systems</li>
                    <li>Enable selective scanning for USB drives</li>
                    <li>Configure behavior monitoring thresholds</li>
                    <li>Enable network threat protection on critical segments</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Monitoring and Alerting</h2>
                
                <h3>Key Metrics to Monitor</h3>
                <ul>
                    <li>Threats detected and remediated trends</li>
                    <li>Scan completion rates and durations</li>
                    <li>Unmanaged endpoint status</li>
                    <li>Outdated definition file age</li>
                    <li>Server resource utilization during scans</li>
                </ul>

                <h3>Sophos Central Dashboards</h3>
                <p>Configure alerts for:</p>
                <ul>
                    <li>Failed threat remediation</li>
                    <li>Offline devices for more than 24 hours</li>
                    <li>Policy violations</li>
                    <li>High-risk threats (PUA, Trojan, Ransomware)</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Maintenance and Updates</h2>
                
                <h3>Regular Maintenance Tasks</h3>
                <ul>
                    <li>Monthly review of excluded files/folders</li>
                    <li>Quarterly audit of scanning effectiveness</li>
                    <li>Semi-annual performance baseline updates</li>
                    <li>Immediate patching of critical vulnerabilities</li>
                </ul>

                <h3>Update Strategy</h3>
                <p>Maintain optimal performance through proper update management:</p>
                <ul>
                    <li>Deploy updates during maintenance windows</li>
                    <li>Test updates in development first</li>
                    <li>Monitor systems for 48 hours post-update</li>
                    <li>Document any performance regressions</li>
                </ul>
            </div>
        `
    },

    'hybrid-identity': {
        title: 'Hybrid Identity Best Practices',
        category: 'Best Practices',
        categoryColor: 'green',
        date: 'October 2025',
        readTime: '13 min read',
        content: `
            <div class="article-section">
                <h2>Hybrid Identity Best Practices</h2>
                <p>Hybrid identity management bridges on-premises Active Directory and Azure AD, enabling seamless authentication across cloud and on-premises resources. Implementing best practices ensures security, scalability, and user satisfaction. This comprehensive guide covers strategies, configurations, and operational procedures for enterprise hybrid identity environments.</p>
            </div>

            <div class="article-section">
                <h2>Architecture Fundamentals</h2>
                
                <h3>Synchronization Models</h3>
                <p>Choose the model that best fits your organization:</p>
                <ul>
                    <li><strong>Password Hash Sync:</strong> Simplest option, full cloud backup for on-prem AD</li>
                    <li><strong>Pass-through Auth:</strong> Lighter weight, validates against on-prem AD</li>
                    <li><strong>Federated Identity:</strong> Complex but flexible, external IdP control</li>
                </ul>

                <h3>Recommended Architecture</h3>
                <p>Most organizations benefit from Password Hash Sync + Seamless SSO combined with Conditional Access for optimal balance of security and usability.</p>
            </div>

            <div class="article-section">
                <h2>Azure AD Connect Deployment</h2>
                
                <h3>Pre-Deployment Checklist</h3>
                <ul>
                    <li>☐ Verify .NET Framework 4.5.1 or higher installed</li>
                    <li>☐ Configure sufficient disk space (25GB minimum)</li>
                    <li>☐ Plan sync cycle frequency (default 30 minutes)</li>
                    <li>☐ Identify all forests requiring synchronization</li>
                    <li>☐ Document custom attribute requirements</li>
                </ul>

                <h3>Service Account Configuration</h3>
                <p>The Azure AD Connect service account requires specific permissions:</p>
                <div class="article-code">
                    <code># Create service account (as Domain Admin):
New-ADUser -Name "AAD_Connect" -AccountPassword (ConvertTo-SecureString "Password123!" -AsPlainText -Force) -Enabled $true

# Grant required permissions in Active Directory:
# 1. Replicating Directory Changes
# 2. Replicating Directory Changes All
# 3. Replicating Directory Changes In Filtered Set
                    </code>
                </div>

                <h3>Initial Sync Configuration</h3>
                <ul>
                    <li>Use "Express Settings" only for single forest deployments</li>
                    <li>For complex environments, use "Custom Settings"</li>
                    <li>Carefully select organizational units to sync</li>
                    <li>Configure filtering to exclude test and admin accounts</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Hybrid Security Hardening</h2>
                
                <h3>Password Policy Alignment</h3>
                <p>Ensure consistency across on-prem and cloud:</p>
                <ul>
                    <li>Minimum password length: 14 characters (or enforce passphrase)</li>
                    <li>Complexity requirements: Upper, lower, number, symbol</li>
                    <li>Password expiration: 90 days (consider passwordless alternative)</li>
                    <li>Account lockout: 5 attempts, 30-minute lockout</li>
                </ul>

                <h3>Multi-Factor Authentication Strategy</h3>
                <p>Implement MFA across all user populations:</p>
                <div class="article-highlight">
                    <p><strong>Recommended Approach:</strong> Azure AD Conditional Access with Microsoft Authenticator app for passwordless sign-in, fallback to TOTP or hardware keys for regulatory compliance.</p>
                </div>

                <h3>Conditional Access Policies</h3>
                <ul>
                    <li>Require MFA for all administrators</li>
                    <li>Block legacy authentication protocols</li>
                    <li>Enforce device compliance for sensitive resources</li>
                    <li>Implement risk-based policies for anomalous behavior</li>
                    <li>Restrict external access by geography where appropriate</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Directory Synchronization Best Practices</h2>
                
                <h3>Attribute Synchronization Strategy</h3>
                <ul>
                    <li>Sync only attributes required for business operations</li>
                    <li>Implement source of authority (on-prem is authoritative)</li>
                    <li>Document all custom attribute mappings</li>
                    <li>Avoid circular write scenarios</li>
                </ul>

                <h3>Group and Distribution List Management</h3>
                <div class="article-code">
                    <code># PowerShell script to review sync groups:
Get-ADGroup -Filter * | Where-Object {$_.GroupScope -eq "Global"} | Measure-Object

# Verify group membership in Azure AD:
Get-MsolGroupMember -GroupObjectId "ObjectID"

# Troubleshoot specific group sync:
Get-MsolGroup | Select-Object DisplayName, ObjectId | Where-Object DisplayName -like "*YourGroup*"
                    </code>
                </div>

                <h3>Sync Cycle Monitoring</h3>
                <ul>
                    <li>Monitor Azure AD Connect Health for sync errors</li>
                    <li>Review sync logs in Event Viewer regularly</li>
                    <li>Set up alerts for failed or delayed sync cycles</li>
                    <li>Maintain sync cycle frequency (30 minutes recommended)</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Advanced Features</h2>
                
                <h3>Device Registration and Management</h3>
                <p>Modern endpoint management requires device enrollment:</p>
                <ul>
                    <li>Enable Azure AD Hybrid Join for on-prem domain computers</li>
                    <li>Configure automatic device registration via Group Policy</li>
                    <li>Implement Intune enrollment for BYOD devices</li>
                    <li>Enforce device compliance policies</li>
                </ul>

                <h3>Exchange Hybrid Scenarios</h3>
                <p>Manage mailboxes across on-prem and cloud:</p>
                <ul>
                    <li>Maintain mail attribute consistency</li>
                    <li>Configure free/busy sharing</li>
                    <li>Implement modern hybrid authentication</li>
                    <li>Monitor cross-premises mail flow</li>
                </ul>

                <h3>Teams and Collaboration</h3>
                <ul>
                    <li>Sync Teams-related attributes with Azure AD</li>
                    <li>Configure Teams identity scenarios</li>
                    <li>Implement governance policies for Teams creation</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Troubleshooting Hybrid Identity Issues</h2>
                
                <h3>Common Synchronization Problems</h3>
                <div class="article-table">
                    <table>
                        <tr>
                            <th>Issue</th>
                            <th>Cause</th>
                            <th>Solution</th>
                        </tr>
                        <tr>
                            <td>Duplicate Object Error</td>
                            <td>Object exists in both directories</td>
                            <td>Remove from Azure AD or on-prem AD</td>
                        </tr>
                        <tr>
                            <td>Sync Delay</td>
                            <td>Large delta or network latency</td>
                            <td>Check network, review sync logs</td>
                        </tr>
                        <tr>
                            <td>Group Member Not Syncing</td>
                            <td>Attribute filter or group scope issue</td>
                            <td>Verify group scope is Global</td>
                        </tr>
                    </table>
                </div>

                <h3>Password Sync Failures</h3>
                <p>Troubleshoot password sync issues:</p>
                <ul>
                    <li>Verify service account has "Reset Password" permissions</li>
                    <li>Check Azure AD Connect service is running</li>
                    <li>Review event logs for synchronization errors</li>
                    <li>Test password sync for specific user</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Operational Excellence</h2>
                
                <h3>Maintenance Schedule</h3>
                <ul>
                    <li><strong>Daily:</strong> Review sync errors in Azure AD Connect Health</li>
                    <li><strong>Weekly:</strong> Verify MFA adoption and policy effectiveness</li>
                    <li><strong>Monthly:</strong> Analyze access patterns and conditional access triggers</li>
                    <li><strong>Quarterly:</strong> Audit group memberships and permissions</li>
                </ul>

                <h3>Disaster Recovery Planning</h3>
                <ul>
                    <li>Maintain secondary Azure AD Connect server for redundancy</li>
                    <li>Document manual sync procedures if automatic sync fails</li>
                    <li>Implement Azure AD B2C for emergency external access</li>
                    <li>Test disaster recovery procedures quarterly</li>
                </ul>
            </div>

            <div class="article-section">
                <h2>Conclusion</h2>
                <p>Hybrid identity requires careful planning, ongoing monitoring, and continuous optimization. By implementing these best practices, organizations achieve a secure, scalable, and user-friendly authentication infrastructure that bridges on-premises and cloud environments seamlessly.</p>
            </div>
        `
    }
};

// Article modal click handlers
document.querySelectorAll('[data-article]').forEach(card => {
    card.addEventListener('click', () => {
        const articleId = card.getAttribute('data-article');
        const article = articlesData[articleId];
        
        if (article) {
            // Update modal content
            document.getElementById('articleTitle').textContent = article.title;
            document.getElementById('articleCategory').textContent = article.category;
            document.getElementById('articleDate').textContent = article.date;
            document.getElementById('articleReadTime').textContent = article.readTime;
            document.getElementById('articleContent').innerHTML = article.content;
            
            // Show modal
            articleModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close article modal
function closeArticleModalWindow() {
    articleModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

closeArticleModal.addEventListener('click', closeArticleModalWindow);
closeArticleBtn.addEventListener('click', closeArticleModalWindow);

// Close modal when clicking outside
articleModal.addEventListener('click', (e) => {
    if (e.target === articleModal) closeArticleModalWindow();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !articleModal.classList.contains('hidden')) {
        closeArticleModalWindow();
    }
});

// ============================================
const certModal = document.getElementById('certModal');
const closeModal = document.getElementById('closeModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');

// Sample certificate data
const certificateData = {
    'az-900': {
        title: 'Microsoft Certified: Azure Fundamentals',
        issuer: 'Microsoft',
        credentialId: 'AZ-900-12345',
        date: '2023',
        description: 'Demonstrates foundational level knowledge of cloud services and how those services are provided with Microsoft Azure.'
    },
    'ms-900': {
        title: 'Microsoft 365 Certified: Fundamentals',
        issuer: 'Microsoft',
        credentialId: 'MS-900-67890',
        date: '2023',
        description: 'Demonstrates foundational knowledge of Microsoft 365 solutions and how to implement them across an organization.'
    },
    'fortinet': {
        title: 'Fortinet NSE Level 1, 2 & 3',
        issuer: 'Fortinet',
        credentialId: 'NSE-CERT-001',
        date: '2022',
        description: 'Certified Network Security Expert with expertise in FortiGate and advanced security architecture.'
    },
    'kubernetes': {
        title: 'Introduction to Kubernetes',
        issuer: 'Linux Foundation',
        credentialId: 'LFS158-2023',
        date: '2023',
        description: 'Successfully completed the LFS158 Introduction to Kubernetes course covering container orchestration.'
    }
};

// Make cert cards clickable
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
        const certTitle = card.querySelector('p').textContent;
        const certKey = certTitle.toLowerCase().replace(/\s+/g, '-');
        
        // Try to find matching certificate data
        let certInfo = certificateData[certKey] || 
                       certificateData['az-900']; // Default fallback
        
        // Update modal with certificate info
        document.getElementById('modalTitle').textContent = certInfo.title;
        document.getElementById('modalIssuer').textContent = certInfo.issuer;
        document.getElementById('modalCredentialId').textContent = certInfo.credentialId;
        document.getElementById('modalDate').textContent = certInfo.date;
        document.getElementById('modalDescription').textContent = certInfo.description;
        
        // Update verify button link
        document.getElementById('modalVerifyBtn').href = '#';
        
        // Show modal
        certModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
});

// Close modal functions
function closeModalWindow() {
    certModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

closeModal.addEventListener('click', closeModalWindow);
modalCloseBtn.addEventListener('click', closeModalWindow);

// Close modal when clicking outside
certModal.addEventListener('click', (e) => {
    if (e.target === certModal) closeModalWindow();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !certModal.classList.contains('hidden')) {
        closeModalWindow();
    }
});

// ============================================
// CONTACT FORM SUBMIT HANDLER
// ============================================
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = e.target.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Show loading state
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg> Sending...';
        btn.disabled = true;
        
        // Simulate form submission (replace with actual backend call)
        setTimeout(() => {
            btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg> Message Sent!';
            btn.style.background = '#16a34a';
            e.target.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }, 1200);
    });
}

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================================
// ENHANCED ANIMATIONS ON PAGE LOAD
// ============================================
window.addEventListener('load', () => {
    // Animate hero elements
    const heroElements = document.querySelectorAll('.reveal');
    heroElements.forEach((el, index) => {
        if (index < 4) {
            el.classList.add('visible');
        }
    });
});

// ============================================
// LAZY LOADING FOR IMAGES
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.remove('opacity-0');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}
