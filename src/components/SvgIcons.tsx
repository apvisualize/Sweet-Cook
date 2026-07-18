import React from 'react';

// Bank Central Asia (BCA) SVG Logo
export const SvgBca: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg
    viewBox="0 0 100 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="BCA Logo"
  >
    {/* Dark Blue Rounded Container */}
    <rect width="100" height="32" rx="6" fill="#005BAA" />
    
    {/* BCA Styled Diamond Shield logo on the left */}
    <g transform="translate(8, 6)">
      <path
        d="M 10 2 L 18 10 L 10 18 L 2 10 Z"
        fill="white"
        opacity="0.15"
      />
      <path
        d="M 10 0 L 20 10 L 10 20 L 0 10 Z"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Central wave pattern */}
      <path
        d="M 5 10 C 8 7, 12 13, 15 10"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 7 13 C 10 11, 10 15, 13 13"
        stroke="white"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </g>

    {/* BCA Typography */}
    <text
      x="36"
      y="22"
      fill="#FFFFFF"
      fontFamily="Inter, system-ui, sans-serif"
      fontWeight="900"
      fontSize="15"
      letterSpacing="1.2"
    >
      BCA
    </text>
  </svg>
);

// QRIS SVG Logo
export const SvgQris: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg
    viewBox="0 0 100 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="QRIS Logo"
  >
    {/* QRIS White Rounded Container with fine outline */}
    <rect width="100" height="32" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    
    {/* QR Code Matrix Mini Grid Icon */}
    <g transform="translate(10, 8)" fill="#002D62">
      <rect x="0" y="0" width="5" height="5" stroke="#002D62" strokeWidth="1.2" fill="none" />
      <rect x="1.5" y="1.5" width="2" height="2" fill="#002D62" />
      <rect x="11" y="0" width="5" height="5" stroke="#002D62" strokeWidth="1.2" fill="none" />
      <rect x="12.5" y="12.5" width="2" height="2" fill="#002D62" />
      <rect x="0" y="11" width="5" height="5" stroke="#002D62" strokeWidth="1.2" fill="none" />
      <rect x="1.5" y="12.5" width="2" height="2" fill="#002D62" />
      <rect x="7" y="3" width="2" height="2" fill="#DF1E26" />
      <rect x="7" y="11" width="2" height="2" fill="#DF1E26" />
      <rect x="11" y="7" width="2" height="2" fill="#002D62" />
    </g>

    {/* QRIS Text with authentic brand colors (QR in Red, IS in Blue) */}
    <g transform="translate(34, 21)" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13" letterSpacing="-0.2">
      <text fill="#DF1E26">QR</text>
      <text fill="#002D62" dx="19">IS</text>
    </g>
  </svg>
);

// JNE Express SVG Logo
export const SvgJne: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg
    viewBox="0 0 100 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="JNE Logo"
  >
    {/* White Background Container */}
    <rect width="100" height="32" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
    
    {/* JNE Typo & Brand Swoosh */}
    <g transform="translate(12, 6)">
      {/* Dynamic speed trails in background */}
      <path d="M 2 15 Q 15 17 32 15" stroke="#DF1E26" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 5 11 Q 20 12 35 11" stroke="#2B3A8F" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* JNE Text */}
      <text
        x="12"
        y="14"
        fill="#2B3A8F"
        fontFamily="sans-serif"
        fontWeight="900"
        fontSize="14"
        fontStyle="italic"
        letterSpacing="0.5"
      >
        JNE
      </text>
      <text
        x="42"
        y="14"
        fill="#DF1E26"
        fontFamily="sans-serif"
        fontWeight="800"
        fontSize="11"
        fontStyle="italic"
      >
        express
      </text>
    </g>
  </svg>
);

// J&T Express SVG Logo
export const SvgJnt: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg
    viewBox="0 0 100 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="J&T Express Logo"
  >
    {/* Brand Red Background */}
    <rect width="100" height="32" rx="6" fill="#FF0000" />
    
    <g transform="translate(14, 21)" fontFamily="Inter, system-ui, sans-serif" fontStyle="italic">
      {/* Bold geometric J&T */}
      <text
        fill="#FFFFFF"
        fontWeight="900"
        fontSize="16"
        letterSpacing="1"
      >
        J&T
      </text>
      {/* small EXPRESS text */}
      <text
        x="38"
        y="-3"
        fill="#FFFFFF"
        fontWeight="700"
        fontSize="7"
        letterSpacing="0.2"
        fontStyle="normal"
      >
        EXPRESS
      </text>
    </g>
  </svg>
);

// Paxel Same Day SVG Logo
export const SvgPaxel: React.FC<{ className?: string }> = ({ className = "h-5" }) => (
  <svg
    viewBox="0 0 100 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label="Paxel Logo"
  >
    {/* Brand Distinct Dark Purple/Violet Background */}
    <rect width="100" height="32" rx="6" fill="#4B1248" />
    
    <g transform="translate(10, 6)">
      {/* 3D Box Origami shape of Paxel */}
      <g transform="scale(0.85) translate(2, 2)">
        <path d="M 8 0 L 16 4 L 8 8 L 0 4 Z" fill="#FFC72C" />
        <path d="M 0 4 L 8 8 L 8 16 L 0 12 Z" fill="#FFA300" />
        <path d="M 8 8 L 16 4 L 16 12 L 8 16 Z" fill="#E87722" />
      </g>
      
      {/* Paxel Lettering */}
      <text
        x="24"
        y="15"
        fill="#FFFFFF"
        fontFamily="Inter, system-ui, sans-serif"
        fontWeight="800"
        fontSize="12.5"
        letterSpacing="0.2"
      >
        paxel
      </text>
    </g>
  </svg>
);
