---
title: "Today I Hacked: Stripping Windows 10 to its WSL Essentials"
created: 2026-01-19 12:15 
date: 2026-01-19 
public: true 
coverImage: https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=1000 
categories: 
 - Engineering 
 - Performance 
tags: 
  - topic/windows-10 
  - topic/wsl 
  - topic/powershell 
  - topic/minimalism 
  - topic/System Optimization 

description: Learn how to transform an HP Spectre into a high-performance thin wrapper for WSL and browsing. This post covers a surgical approach to disabling telemetry and bloatware using a custom PowerShell script with built-in safety checkpoints and restoration logic.
---

# Today I Hacked: Turning Windows 10 into a "Thin Wrapper" for WSL

Lately, I’ve been feeling the "bloat" of Windows 10. I use an **HP Spectre**, a beautiful piece of hardware, but out of the box, it’s crawling with HP-specific analytics, telemetry, and consumer-facing services I simply never touch.

<!-- more -->

My goal was simple: **I want my laptop to be a thin, high-performance wrapper.** I need exactly two things to work perfectly: a **web browser** and **WSL2 (Windows Subsystem for Linux)**. Everything else is just noise stealing my CPU cycles and RAM.

So, I built a script to strip it down safely.

---

### Why I Built This

When I first reimaged this PC with a fresh copy of Windows 10, I immediately reached for the Chris Titus Tech WinUtil script [^1]. It is an incredible tool for bulk cleanup and setting up a baseline optimized environment.

Most "Windows Debloater" scripts are black boxes—they disable hundreds of things, and you have no idea what might break. I needed something surgical. I wanted to:

1. **Kill the HP "Insights" and Analytics:** Manufacturer telemetry is often more resource-heavy than Windows telemetry itself.
2. **Silence the "Consumer" Noise:** I don't need my laptop trying to sync with a Samsung phone, routing SMS messages, or running Xbox Game Services.
3. **Protect the Virtualization Layer:** I needed a script smart enough to know that if it touches `hns` or `vmcompute`, my WSL environment dies.

### Who is this for?

* **Developers** who live in the terminal and treat Windows merely as a bootloader for Linux.
* **Minimalists** who hate background processes and "telemetry" on principle.
* **Laptop Users** on high-end thin-and-lights (like the Spectre or Dell XPS) looking to squeeze out every drop of battery life and thermal headroom.

---
### My recomended workflow. 
####  Step 1: Safety First 

Before touching services, I created a full Windows System Restore point. This is your "get out of jail free" card if the OS becomes unstable.

```powershell
Checkpoint-Computer -Description "Before Slimming" -RestorePointType "MODIFY_SETTINGS"

```

#### **Step 2: Dump the "Running" List**

I needed to know exactly what was alive on *my* specific machine. I ran this to get a clean list of active services:

```powershell
Get-Service | Where-Object {$_.Status -eq "Running"} | Select-Object Name, DisplayName | ft -AutoSize

```

#### **Step 3: Consult your AI sidekick or whoever you trust with Windows geekdom**

I fed that list into **Gemini** with a specific prompt:

> *"I want a thin wrapper for WSL and browsing on an HP Spectre. Based on this list of running services, give me a string array of service names that are absolutely safe to disable (HP bloat, telemetry, consumer features) without breaking virtualization or basic networking."*

#### Step 4: Surgically Neuter 

Once I had my string array, I plugged it into my `wiresurfer-win10-slimmer` script. This script doesn't just kill services; it creates a **service-state YAML file** so I can see exactly what was enabled initially and toggle them back if a specific hardware feature (like the webcam or a sensor) stops working.



### powershell script : `wiresurfer-win10-slimmer.ps1`

This PowerShell utility doesn't just "nuke" services. It follows a professional workflow: **Checkpoint → Disable → Evaluate → Restore.**

```powershell
# Save as wiresurfer-win10-slimmer.ps1
param (
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateSet("service")]
    $Action,

    [Parameter(Mandatory=$true, Position=1)]
    [ValidateSet("checkpoint", "disable", "restore")]
    $Command,

    [Parameter(Mandatory=$false)]
    [Alias("f")]
    $File
)

# The "Thin Wrapper" Target List: HP Bloat, Telemetry, and Consumer Services
$BloatServices = @(
    "HPAppHelperCap", "HPDiagsCap", "HPNetworkCap", "hp-one-agent-service", 
    "HPSysInfoCap", "HpTouchpointAnalyticsService", "SamsungAccountService",
    "DPS", "WdiServiceHost", "WdiSystemHost", "DusmSvc", "DiagTrack", "PcaSvc",
    "PhoneSvc", "SmsRouter", "TabletInputService", "Stisvc", "CDPSvc", 
    "ClickToRunSvc", "GamingServices", "GamingServicesNet", "MapsBroker"
)

function Get-Timestamp { Get-Date -Format "yyyyMMdd-HHmmss" }

switch ($Command) {
    "checkpoint" {
        $timestamp = Get-Timestamp
        $filename = "wiresurfer-service-status-$timestamp.yaml"
        $report = @()
        Write-Host "Creating safety checkpoint..." -ForegroundColor Cyan
        foreach ($svcName in $BloatServices) {
            if (Get-Service $svcName -ErrorAction SilentlyContinue) {
                $s = Get-Service $svcName
                $report += "  - name: $($s.Name)`n    state: $($s.Status)`n    startuptype: $($s.StartType)"
            }
        }
        "services:`n$($report -join "`n")" | Out-File $filename
        Write-Host "Checkpoint saved: $filename" -ForegroundColor Green
    }

    "disable" {
        $confirm = Read-Host "Ready to slim down Windows? (y/n)"
        if ($confirm -eq 'y') {
            foreach ($svcName in $BloatServices) {
                if (Get-Service $svcName -ErrorAction SilentlyContinue) {
                    Write-Host "Disabling: $svcName" -ForegroundColor Yellow
                    Set-Service $svcName -StartupType Disabled -ErrorAction SilentlyContinue
                    Stop-Service $svcName -Force -ErrorAction SilentlyContinue
                }
            }
            Write-Host "🚀 Windows is now a thin wrapper. Enjoy the speed." -ForegroundColor Green
        }
    }

    "restore" {
        if (-not $File) { Write-Error "Provide a checkpoint file!"; break }
        Write-Host "Restoring from $File..." -ForegroundColor Cyan
        $content = Get-Content $File
        $currentSvc = ""
        foreach ($line in $content) {
            if ($line -match "name: (.*)") { $currentSvc = $matches[1].Trim() }
            if ($line -match "startuptype: (.*)") {
                Set-Service $currentSvc -StartupType $matches[1].Trim() -ErrorAction SilentlyContinue
            }
            if ($line -match "state: Running") { Start-Service $currentSvc -ErrorAction SilentlyContinue }
        }
        Write-Host "Restore complete." -ForegroundColor Green
    }
}

```

---

### The Pros and Cons

#### **The Benefits**

* **Reduced RAM & CPU Overhead:** By killing the "Insight" analytics and diagnostic hosts, you stop random CPU spikes that usually occur during idle time.
* **Privacy:** Fewer "phone home" packets being sent to HP and Microsoft.
* **Simplicity:** No more "Phone Link" or "Xbox" popups when you're just trying to compile code.

#### **The Drawbacks**

* **Vendor Features:** If you use HP's specialized "Smart Sense" or custom battery health capping software, disabling all HP services might break those features.
* **Manual Troubleshooting:** If you run into a network issue, the "Diagnostic Policy Service" won't be there to "Auto-fix" it for you. You're back to the manual way.
* **No Windows Update "Orchestration":** Disabling things like `UsoSvc` (if added to the list) means you have to be disciplined about manually checking for security patches.

### The Verdict

For me, it’s worth it. My HP Spectre now feels like a specialized workstation rather than a consumer gadget. It boots faster, stays cooler, and most importantly, stays out of my way while I work in WSL.

**If you try this, always run the `checkpoint` command first. Your future self will thank you.**


## Footnotes

[^1]: WinUtil (Chris Titus Tech): The "Swiss Army Knife" of Windows optimization. This was my first step for initial OS setup.
