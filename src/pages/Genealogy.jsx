import React, { useState } from 'react';
import { Calendar, GitMerge, Layers, Search, Compass, Info } from 'lucide-react';

export default function Genealogy() {
    const [selectedYear, setSelectedYear] = useState(1991);
    const [searchYear, setSearchYear] = useState('');
    const [searchResult, setSearchResult] = useState(null);

    const genealogyData = [
        { year: 1919, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1920, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1921, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1922, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1923, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1924, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1925, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1926, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1927, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1928, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1929, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1930, tn: "UnD", other: "UnD", label: "Undistricted" },
        { year: 1931, tn: "A", other: "A", label: "District A" },
        { year: 1932, tn: "A", other: "A", label: "District A" },
        { year: 1933, tn: "A", other: "A", label: "District A" },
        { year: 1934, tn: "A", other: "A", label: "District A" },
        { year: 1935, tn: "89", other: "89", label: "District 89" },
        { year: 1936, tn: "89", other: "89", label: "District 89" },
        { year: 1937, tn: "89", other: "89", label: "District 89" },
        { year: 1938, tn: "89", other: "89", label: "District 89 (Madurai Club Chartered)" },
        { year: 1939, tn: "89", other: "89", label: "District 89" },
        { year: 1940, tn: "89", other: "89", label: "District 89" },
        { year: 1941, tn: "89", other: "89", label: "District 89" },
        { year: 1942, tn: "91", other: "91", label: "District 91" },
        { year: 1943, tn: "91", other: "91", label: "District 91" },
        { year: 1944, tn: "91", other: "91", label: "District 91" },
        { year: 1945, tn: "91", other: "91", label: "District 91" },
        { year: 1946, tn: "94", other: "94", label: "District 94" },
        { year: 1947, tn: "94", other: "94", label: "District 94" },
        { year: 1948, tn: "89", other: "94", label: "District 89 / 94" },
        { year: 1949, tn: "51", other: "56", label: "District 51 / 56" },
        { year: 1950, tn: "51", other: "56", label: "District 51 / 56" },
        { year: 1951, tn: "51", other: "56", label: "District 51 / 56" },
        { year: 1952, tn: "51", other: "56", label: "District 51 / 56" },
        { year: 1953, tn: "51", other: "56", label: "District 51 / 56" },
        { year: 1954, tn: "51", other: "56", label: "District 51 / 56" },
        { year: 1955, tn: "51", other: "56", label: "District 51 / 56" },
        { year: 1956, tn: "51", other: "56", label: "District 51 / 56" },
        { year: 1957, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1958, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1959, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1960, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1961, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1962, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1963, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1964, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1965, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1966, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1967, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1968, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1969, tn: "300", other: "320", label: "District 300 / 320" },
        { year: 1970, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1971, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1972, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1973, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1974, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1975, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1976, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1977, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1978, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1979, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1980, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1981, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1982, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1983, tn: "300", other: "321", label: "District 300 / 321" },
        { year: 1984, tn: "300", other: "322", label: "District 300 / 322" },
        { year: 1985, tn: "300", other: "322", label: "District 300 / 322" },
        { year: 1986, tn: "300", other: "322", label: "District 300 / 322" },
        { year: 1987, tn: "300", other: "322", label: "District 300 / 322" },
        { year: 1988, tn: "300", other: "322", label: "District 300 / 322" },
        { year: 1989, tn: "300", other: "322", label: "District 300 / 322" },
        { year: 1990, tn: "300", other: "322", label: "District 300 / 322" },
        { year: 1991, tn: "300", other: "3000", label: "Transition to 3000" },
        { year: 1992, tn: "3000", other: "3000", label: "District 3000" },
        { year: 1993, tn: "3000", other: "3000", label: "District 3000" },
        { year: 1994, tn: "3000", other: "3000", label: "District 3000" },
        { year: 1995, tn: "3000", other: "3000", label: "District 3000" },
        { year: 1996, tn: "3000", other: "3000", label: "District 3000" },
        { year: 1997, tn: "3000", other: "3000", label: "District 3000" },
        { year: 1998, tn: "3000", other: "3000", label: "District 3000" },
        { year: 1999, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2000, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2001, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2002, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2003, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2004, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2005, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2006, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2007, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2008, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2009, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2010, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2011, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2012, tn: "3000", other: "3000", label: "District 3000" },
        { year: 2013, tn: "3000", other: "3000", label: "District 3000" }
    ];

    const milestones = [
        { era: "1919 - 1930", dist: "Undistricted (UnD)", desc: "Rotary was in its expansion phase in South Asia. No official local districts were mapped during this era.", icon: <Compass size={24} /> },
        { era: "1931 - 1934", dist: "District A", desc: "First official grouping in the region. Covers major cities in the Indian subcontinent under one provincial banner.", icon: <Calendar size={24} /> },
        { era: "1935 - 1941", dist: "District 89", desc: "Covers Southern India. The Rotary Club of Madurai was chartered during this period, on December 27, 1938.", icon: <Layers size={24} /> },
        { era: "1942 - 1947", dist: "District 91 / 94", desc: "World War II and post-war realignment of districts across India, Ceylon, and Burma.", icon: <GitMerge size={24} /> },
        { era: "1949 - 1956", dist: "District 51 & 56", desc: "Post-independence division separating the Tamil Nadu mainland from the surrounding coastal areas, Kerala, and Colombo.", icon: <Layers size={24} /> },
        { era: "1957 - 1990", dist: "District 300 & 320/321/322", desc: "Three-digit systems introduced. India Tamil Nadu mapped to District 300, while the surrounding region shifts through 320, 321, and 322.", icon: <GitMerge size={24} /> },
        { era: "1991 - Present", dist: "District 3000", desc: "Merging of heritage districts to establish the modern, highly active District 3000 governing Central and Southern Tamil Nadu.", icon: <Info size={24} /> },
    ];

    const currentYearData = genealogyData.find(item => item.year === selectedYear) || genealogyData[genealogyData.length - 1];

    const handleSearch = (e) => {
        e.preventDefault();
        const yrNum = parseInt(searchYear);
        if (!isNaN(yrNum)) {
            const found = genealogyData.find(item => item.year === yrNum);
            if (found) {
                setSearchResult(found);
            } else {
                setSearchResult({ error: true, message: `No record found for year ${yrNum}. (Select years between 1919 and 2013)` });
            }
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '100vh', paddingBottom: '80px' }}>
            {/* Header Section */}
            <section className="section-hero" style={{ 
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
                color: 'white', 
                padding: '100px 0 80px 0', 
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-50%',
                    left: '-50%',
                    width: '200%',
                    height: '200%',
                    background: 'radial-gradient(circle, rgba(0, 97, 242, 0.08) 0%, transparent 60%)',
                    zIndex: 0
                }}></div>

                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', padding: '6px 18px' }}>
                        District Genealogy
                    </span>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '20px 0', color: 'white' }}>
                        RI District 3000 History & Genealogy
                    </h1>
                    <p style={{ maxWidth: '750px', margin: '0 auto', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Explore the historical lineage of Rotary District 3000. Under the Rotary Global History Fellowship (RGHF) dataset, trace the mapping changes from 1919 to the modern era.
                    </p>
                </div>
            </section>

            {/* Interactive Timeline Dashboard */}
            <section className="section" style={{ padding: '80px 0 50px 0' }}>
                <div className="container">
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '40px' }}>
                        <span className="badge">Interactive Explorer</span>
                        <h2>Year-by-Year Lineage</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Slide the slider to inspect the district codes for any specific year.</p>
                    </div>

                    <div className="grid-2" style={{ gap: '40px', alignItems: 'stretch' }}>
                        {/* Control panel */}
                        <div className="reveal-up" style={{ 
                            backgroundColor: 'white', 
                            padding: '40px', 
                            borderRadius: '24px', 
                            border: '1.5px solid var(--border-color)', 
                            boxShadow: 'var(--shadow-md)',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between'
                        }}>
                            <div>
                                <h3 style={{ color: 'var(--secondary)', marginBottom: '16px', fontSize: '1.4rem' }}>Select Historical Year</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '30px' }}>
                                    Drag the slider to select any year from 1919 to 2013 to observe the evolution of District 3000's territory and split designations.
                                </p>

                                {/* Slider */}
                                <div style={{ margin: '30px 0' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '10px' }}>
                                        <span>Selected Year:</span>
                                        <span style={{ fontSize: '1.6rem', borderBottom: '2px solid var(--primary)', paddingBottom: '2px' }}>{selectedYear}</span>
                                    </div>
                                    <input 
                                        type="range" 
                                        min="1919" 
                                        max="2013" 
                                        value={selectedYear} 
                                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                        style={{ 
                                            width: '100%', 
                                            accentColor: 'var(--primary)',
                                            height: '8px',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    />
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                                        <span>1919 (Undistricted)</span>
                                        <span>Charter Year (1938)</span>
                                        <span>2013 (Modern)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Search Utility */}
                            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '30px', marginTop: '20px' }}>
                                <h4 style={{ color: 'var(--secondary)', marginBottom: '10px', fontSize: '1.05rem' }}>Search Specific Year</h4>
                                <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
                                    <div style={{ position: 'relative', flexGrow: 1 }}>
                                        <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                        <input 
                                            type="number" 
                                            placeholder="Enter year (e.g. 1938)" 
                                            min="1919"
                                            max="2013"
                                            value={searchYear}
                                            onChange={(e) => setSearchYear(e.target.value)}
                                            style={{
                                                width: '100%',
                                                padding: '12px 12px 12px 42px',
                                                borderRadius: '30px',
                                                border: '1.5px solid var(--border-color)',
                                                outline: 'none',
                                                fontSize: '0.9rem'
                                            }}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ padding: '10px 22px', borderRadius: '30px' }}>Search</button>
                                </form>

                                {searchResult && (
                                    <div style={{ 
                                        marginTop: '16px', 
                                        padding: '16px', 
                                        borderRadius: '16px', 
                                        backgroundColor: searchResult.error ? '#FEF2F2' : 'var(--primary-light)',
                                        border: searchResult.error ? '1px solid #FCA5A5' : '1px solid var(--primary-border)',
                                        fontSize: '0.9rem'
                                    }}>
                                        {searchResult.error ? (
                                            <span style={{ color: '#EF4444' }}>{searchResult.message}</span>
                                        ) : (
                                            <div>
                                                <strong style={{ color: 'var(--secondary)' }}>Year {searchResult.year} Findings:</strong>
                                                <ul style={{ marginTop: '8px', paddingLeft: '20px', listStyleType: 'circle', color: 'var(--secondary)' }}>
                                                    <li>India Tamil Nadu: <strong>District {searchResult.tn || "n/a"}</strong></li>
                                                    <li>Kerala & Colombo branch: <strong>District {searchResult.other || "n/a"}</strong></li>
                                                    <li>Classification: <em>{searchResult.label}</em></li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Status Card Display */}
                        <div className="reveal-up" style={{ 
                            background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
                            color: 'white', 
                            padding: '40px', 
                            borderRadius: '24px', 
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <div>
                                <span style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '1px', color: 'var(--primary)' }}>
                                    Genealogy Status • {currentYearData.year}
                                </span>
                                <h3 style={{ fontSize: '2rem', fontWeight: '800', marginTop: '10px', color: 'white' }}>
                                    {currentYearData.label}
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '30px' }}>
                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>Mainland Tamil Nadu Designation</span>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'white' }}>
                                                {currentYearData.tn === 'UnD' ? 'UnD' : `Dist. ${currentYearData.tn}`}
                                            </span>
                                            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                                                {currentYearData.tn === 'UnD' ? '(Undistricted)' : ''}
                                            </span>
                                        </div>
                                    </div>

                                    <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '4px' }}>Tamil Nadu, Kerala & Colombo Designation</span>
                                        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                            <span style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)' }}>
                                                {currentYearData.other === 'UnD' ? 'UnD' : currentYearData.other === '' ? 'n/a' : `Dist. ${currentYearData.other}`}
                                            </span>
                                            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                                                {currentYearData.other === 'UnD' ? '(Undistricted)' : ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', marginTop: '30px' }}>
                                * RGHF Genealogy Data Source: Genology District 3000-RGHF.xls. Traces core partitions prior to the 1991/1992 integration.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Structured Eras Grid */}
            <section className="section" style={{ padding: '40px 0 80px 0' }}>
                <div className="container">
                    <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <span className="badge">Structured History</span>
                        <h2>Key Genealogy Milestones</h2>
                        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '15px auto 0 auto' }}>
                            Major historical transitions in the district layout of Southern India and Ceylon.
                        </p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
                        {milestones.map((mil, idx) => (
                            <div key={idx} className="tilt-card reveal-up" style={{ 
                                backgroundColor: 'white', 
                                border: '1.5px solid var(--border-color)', 
                                padding: '30px', 
                                borderRadius: '20px', 
                                transitionDelay: `${idx * 0.05}s`,
                                position: 'relative'
                            }}>
                                <div style={{ 
                                    backgroundColor: 'var(--primary-light)', 
                                    color: 'var(--primary)', 
                                    width: '50px', 
                                    height: '50px', 
                                    borderRadius: '12px', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    marginBottom: '20px'
                                }}>
                                    {mil.icon}
                                </div>
                                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--primary)' }}>{mil.era}</span>
                                <h3 style={{ fontSize: '1.3rem', color: 'var(--secondary)', margin: '8px 0 12px 0' }}>{mil.dist}</h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>{mil.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
