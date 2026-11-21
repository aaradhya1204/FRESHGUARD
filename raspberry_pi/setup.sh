#!/bin/bash
# ExpironGuard Raspberry Pi 4 Setup Script

echo "=========================================="
echo " Setting up ExpironGuard on Raspberry Pi 4"
echo "=========================================="

sudo apt-get update
sudo apt-get install -y \
    python3 \
    python3-pip \
    python3-pygame \
    python3-opencv \
    libzbar0 \
    python3-pil \
    git

pip3 install pyzbar requests --break-system-packages 2>/dev/null || pip3 install pyzbar requests

echo ""
echo "Setup Complete!"
echo "To run the smart trolley:"
echo "   python3 smart_trolley.py"
