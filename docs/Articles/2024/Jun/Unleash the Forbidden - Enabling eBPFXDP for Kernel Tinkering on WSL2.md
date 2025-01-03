---
public: true
title: Unleash the Forbidden - Enabling eBPF/XDP for Kernel Tinkering on WSL2
description:
    We'll focus on enabling eBPF on Ubuntu 20.04 running on WSL2. You can try it
    on 18.04, but your mileage may vary. Here’s a high-level overview of what
    we’ll do:1. Recompile the WSL2 kernel with specific eBPF-related flags
    enabled.2. Change the WSL2 configuration in Windows to point to our newly
    compiled kernel.3. Restart WSL2.4. Verify the new kernel is running and eBPF
    is enabled.
categories:
    - Engineering
tags:
    - topic/platform-engineering
topic:
    - linux
created: 2024-06-04 03:06
modified: 2024-06-04
date: 2024-06-04
coverImage: https://c4.wallpaperflare.com/wallpaper/226/682/452/minecraft-waterfall-video-games-wallpaper-preview.jpg
---

# Unleash the Forbidden - Enabling eBPF/XDP for Kernel Tinkering on WSL2

Running eBPF on WSl2 running on Windows 10 feels forbidden. And yet, that's the
entire premise of this blog.

<!-- more -->

## Why the Heck Would We Do That?

As proud nerds, we find joy in understanding the deepest workings of our
systems. Enabling eBPF in WSL2 is one of those pursuits that opens up a world of
debugging possibilities. It allows us to use eBPF tools, provides full tracing
support via DebugFS, and gives us insights into WSL2's networking stack. This
article will guide you through enabling eBPF in WSL2. Future posts will delve
deeper into specific use cases and the fascinating world of eBPF.

![|300](Assets/media/Unleash%20the%20Forbidden%20-%20Enabling%20eBPFXDP%20for%20Kernel%20Tinkering%20on%20WSL2/Unleash%20the%20Forbidden%20-%20Enabling%20eBPFXDP%20for%20Kernel%20Tinkering%20on%20WSL2-image-2024-06-04-040643.png)

## What's the Plan?

We'll focus on enabling eBPF on Ubuntu 20.04 running on WSL2. You can try it on
18.04, but your mileage may vary. Here’s a high-level overview of what we’ll do:

1. Recompile the WSL2 kernel with specific eBPF-related flags enabled.
2. Change the WSL2 configuration in Windows to point to our newly compiled
   kernel. 3v Restart WSL2.
3. Verify the new kernel is running and eBPF is enabled.

![How do you go about enabling eBPF and tracing on WSL2. Here's the plan|325](Assets/media/Unleash%20the%20Forbidden%20-%20Enabling%20eBPFXDP%20for%20Kernel%20Tinkering%20on%20WSL2/Unleash%20the%20Forbidden%20-%20Enabling%20eBPFXDP%20for%20Kernel%20Tinkering%20on%20WSL2-image-2024-06-04-040708.png)

## Show Me the Code?!

Let's get our hands dirty with some kernel compiling. hold tight.

### 1. Install Dependencies

First, make sure you have the necessary tools installed:

```bash
sudo apt update
sudo apt install build-essential libncurses-dev bison flex libssl-dev libelf-dev
```

### 2. Clone the WSL2 Kernel Source

Download the source code of the WSL2 kernel:

```bash
git clone https://github.com/microsoft/WSL2-Linux-Kernel.git
cd WSL2-Linux-Kernel
```

### 3. Configure the Kernel

Copy the default WSL2 kernel configuration:

```bash
cp Microsoft/config-wsl .config
```

Linux kernel devs have made it intuitive to toggle various features in the linux
kernel using a handy TUI.  
To edit the build configuration of the kernel we have three options.

We use the TUI configurator, and then carefully toggle the features. Its gonna
take a little more effort, but will let you see how you can change kernel
characteristics. Great Learning, Would Recommend, at least once. :)

```bash
make menuconfig
```

In the menu, navigate to:

-   `General setup`
    -   Enable `Debug Filesystem`
    -   `BPF subsystem`
        -   Enable `BPF syscall support`
        -   Enable `Enable bpf() system call`
        -   Enable `Enable extended BPF (eBPF) JIT`
-   `Networking support`
    -   Enable `Networking options`
        -   Enable `Packet socket`
        -   Enable `Network packet filtering framework (Netfilter)`
        -   Enable `BPF-based packet filtering framework`
        -   (optionally) Enable `XDP sockets`
            -   (optionally) Enable `XDP sockets: Monitoring interface`
    -   (optionally) enable `BPF_STREAM_PARSES`
    -   (optionally) go into `Network Testing`
        -   Enable as Module (M) `Packet Generator (USE WITH CAUTION)`

Alternatively, you can manually edit the `.config` file and ensure the following
options are set:

```plaintext
CONFIG_BPF=y
CONFIG_BPF_SYSCALL=y
CONFIG_BPF_JIT=y
CONFIG_HAVE_EBPF_JIT=y
CONFIG_BPF_EVENTS=y
CONFIG_NETFILTER_XT_MATCH_BPF=m
CONFIG_BPFILTER=y
CONFIG_BPFILTER_UMH=m
```

Third and probably the most uninspired way would be, well here is a prepared
config file. Download this, and place it in the `WLS2-kernel` folder.

<script src="https://gist.github.com/wiresurfer/ea0a5f01f23ec23b17491c916111b720.js"></script>

### 4. Compile the Kernel

Compile the kernel with the new configuration:

```bash
make -j$(nproc)
```

### 5. Set WSL2 to Use the Custom Kernel

Copy the compiled kernel to a suitable location:

```bash
cp arch/x86/boot/bzImage /mnt/c/wsl_custom_kernel
```

Edit your `.wslconfig` file (create it if it doesn’t exist) in your Windows home
directory (`C:\Users\<YourUsername>\.wslconfig`) and add the following lines:

```ini
[wsl2]
kernel=C:\\wsl_custom_kernel
```

Restart the WSL2 instance to apply the new kernel:

```powershell
wsl --shutdown
wsl
```

### 6. Verify the New Kernel and eBPF

Check if your new kernel is running:

```bash
uname -r
```

You should see a version number corresponding to your custom kernel build.

Verify eBPF support:

```bash
ls /sys/kernel/debug
```

You should see `bpf` listed among the directories.

## Happy Kernel Hacking!

Congratulations! You've successfully enabled eBPF in WSL2. This setup will serve
as a solid foundation for further kernel debugging and customization. Stay tuned
for future posts where we'll dive deeper into utilizing these capabilities for
various debugging tasks.

![](Assets/media/Unleash%20the%20Forbidden%20-%20Enabling%20eBPFXDP%20for%20Kernel%20Tinkering%20on%20WSL2/Unleash%20the%20Forbidden%20-%20Enabling%20eBPFXDP%20for%20Kernel%20Tinkering%20on%20WSL2-image-2024-06-04-040940.png)

## Further Reading

-   When using `make menuconfig` to change the kernel compilation options, I
    want to highlight some data-centre or Edge site specific options. These show
    up once in a while and for the curious, it might be worth a few clicks and
    research.
    -   `Networking support`
        -   `Enable MPTCP` :
            [**MPTCP**](https://www.redhat.com/en/blog/understanding-multipath-tcp-networking-highway-future#:~:text=MPTCP%20is%20an%20evolutionary%20step,no%20obstruction%20for%20miles%20ahead.)
            is an evolutionary step forward for the TCP protocol to enable
            redundancy for multiple network connections for any device. Your
            phone with Wifi and Mobile 5G. yup, you guessed it. It can use MPTCP
            to route data over both these network paths. Some OEMs enable this,
            or else, in the wild west, there are some AOSP kernels which are
            compiled with this flag on.
        -   Enable `HSR/PRP  High Availability Seamless Redundancy`: Another one
            of those esoteric protocols which aims to solve the high available,
            automatic failover network links problem. You would find this in
            router kernels like pfSense. It operated on Layer1/2 and somewhat
            similar in spirit to what MPTCP does it across two different Layer
            1/2 links but redundant on a Layer 3+ level.
        -   Enable `Open vSwitch` :
            [Open vSwitch](https://docs.openvswitch.org/en/latest/intro/what-is-ovs/)
            is an open-source implementation of a distributed virtual multilayer
            switch. It provides a switching stack for hardware virtualization
            environments, while supporting multiple protocols and standards used
            in computer networks.
        -   Enable `Netlink: socket monitoring tool`: Netlink is used by
            [SS](https://www.man7.org/linux/man-pages/man8/ss.8.html). a socket
            monitoring tool which can dump linux socket statistics. its like
            netstat on steroids with more TCP state information. Very useful in
            debugging odd TCP network congestion and timing related bugs.
-   Note that under `Networking Support`, there's an option
    `Hyper - V transport  for Virtual Sockets` which is enabled. This is a
    Microsoft contributed transport module which enables network packets to
    escape via a virtual socket onto a hyper V network switch. Its a good source
    code read for someone interested.

---

> Have feedback or questions, or want to be notified about more such articles?
> Follow me on Twitter [@wiresurfer](https://x.com/wiresurfer)

---
