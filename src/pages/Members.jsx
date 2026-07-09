import React, { useState, useMemo } from 'react';
import { Search, Calendar, Award, Users, Image as ImageIcon } from 'lucide-react';

const getCloudinaryUrl = (localPath) => {
    if (!localPath) return '';
    let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'doeodacsg';
    // Strip quotes from the cloud name if they were preserved by the bundler/parser
    cloudName = cloudName.replace(/['"]/g, '');
    
    // Normalize path: remove leading slash, replace spaces with underscores
    let cleanPath = localPath.startsWith('/') ? localPath.substring(1) : localPath;
    cleanPath = cleanPath.replace(/ /g, '_');
    
    // Extract file extension (e.g., .jpg, .JPG, .jpeg, .gif, .bmp)
    const extMatch = cleanPath.match(/\.[a-zA-Z0-9]+$/);
    const ext = extMatch ? extMatch[0] : '';
    
    // Strip extension for the public ID
    const cleanPathWithoutExt = cleanPath.replace(/\.[a-zA-Z0-9]+$/, '');
    
    const publicId = `websites/rotary-website/${cleanPathWithoutExt}`;
    const encodedPublicId = publicId.split('/').map(part => encodeURIComponent(part)).join('/');
    
    const isJubilee = localPath.includes('Jubilee') || localPath.includes('jubilee');
    const transform = isJubilee ? 'q_auto,f_auto' : 'w_300,c_limit,q_auto,f_auto';
    
    return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${encodedPublicId}${ext}`;
};

export default function Members() {
    const [activeTab, setActiveTab] = useState('presidents');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDecade, setSelectedDecade] = useState('All');

    const charterMembers = [
        { name: "Sir James Macaffie Doak", designation: "Charter President", img: "/images/Charter Member/Sir James Macaffie Doak.gif" },
        { name: "Rao Bahadur K. Devaji Rao", designation: "Charter Vice-President", img: "/images/Charter Member/002 - Rao Bahadur K.Devaji Rao-5x3.jpg" },
        { name: "Trichur Sundaram Krishna", designation: "Charter Secretary", img: "/images/Charter Member/003 - Trichur Sundaram Krishna.jpg" },
        { name: "Harry Isherwood", designation: "Charter Treasurer", img: "/images/Charter Member/004 - Harry Isherwood.jpg" },
        { name: "Rev. Edward Louis Nolting", designation: "Charter Director", img: "/images/Charter Member/Rev.Edward Louis Nolting.jpg" },
        { name: "K. M. S. L. Sundaraman", designation: "Charter Director", img: "/images/Charter Member/K.M.S.L.Sundaraman.jpg" },
        { name: "Syed Quadir Mohamad Nainer", designation: "Charter Director", img: "/images/Charter Member/016 - Syed Quadir Mohamad Nainer.jpg" },
        { name: "Trichur Sundaram Rajam", designation: "Charter Member", img: "/images/Charter Member/011. Trichur Sundaram Rajam.jpg" },
        { name: "A. H. S. Ramasamy Iyer", designation: "Charter Member", img: "/images/Charter Member/A.H.S.Ramasamy Iyer.jpg" },
        { name: "Dr. Horace Stuart Thomas", designation: "Charter Member", img: "/images/Charter Member/015 - Dr.Horace Stuart Thomas.jpg" },
        { name: "Sir Ponnambalam Thiagarajan", designation: "Charter Member", img: "/images/Charter Member/Sir P.T.Rajan.jpg" }
    ];

    const pastPresidents = [
        { term: "1938 - 1939", name: "Sir James Doak", img: "/images/RCM president/1938-1939 Sir James Doak.jpg" },
        { term: "1939 - 1940", name: "Rev. Edward Louis Nolting", img: "/images/RCM president/1939-1940 Rev.Edward Louis Nolting.jpg" },
        { term: "1940 - 1941", name: "Sir P.T. Rajan", img: "/images/RCM president/1940-1941 Sir P.T.Rajan.jpg" },
        { term: "1941 - 1942", name: "Dr. H.S. Thomas", img: "/images/RCM president/1941-1942 Dr.H.S.Thomas.jpg" },
        { term: "1942 - 1943", name: "T.S. Rajam", img: "/images/RCM president/1942-1943 T.S.Rajam.jpg" },
        { term: "1943 - 1944", name: "Dr. H.S. Thomas", img: "/images/RCM president/1943-1944 Dr.H.S.Thomas.jpg" },
        { term: "1944 - 1945", name: "T.S. Krishna", img: "/images/RCM president/1944-1945 T.S.Krishna.jpg" },
        { term: "1945 - 1946", name: "T.J. Cornelius", img: "/images/RCM president/1945-1946 T.J.Cornelius.jpg" },
        { term: "1946 - 1947", name: "A.H.S. Ramasamy Iyer", img: "/images/RCM president/1946-1947 A.H.S.Ramasamy Iyer.jpg" },
        { term: "1947 - 1948", name: "S. Raja Iyengar", img: "/images/RCM president/1947-1948 S.Raja Iyengar.jpg" },
        { term: "1948 - 1949", name: "Rev. Edward Louis Nolting", img: "/images/RCM president/1948-1949 Rev.Edward Louis Nolting.jpg" },
        { term: "1949 - 1950", name: "M. Duraiswami", img: "/images/RCM president/1949-1950 M.DURAISWAMI.jpg" },
        { term: "1950 - 1951", name: "James M. Hess", img: "/images/RCM president/1950-1951 James M. Hess.jpg" },
        { term: "1951 - 1952", name: "T.S. Rajam", img: "/images/RCM president/1951-1952 T.S.Rajam.jpg" },
        { term: "1952 - 1953", name: "Karumuthu T Sundaram Chettiar", img: "/images/RCM president/1952-1953 Karumuthu T Sundaram Chettiar.jpg" },
        { term: "1953 - 1954", name: "R. Nagaraj", img: "/images/RCM president/1953-1954 R.Nagaraj.jpg" },
        { term: "1954 - 1955", name: "N.M.R. Krishnamoorthy", img: "/images/RCM president/1954-1955 N.M.R.Krishnamoorthy.jpg" },
        { term: "1955 - 1956", name: "A.S. Rajasabai", img: "/images/RCM president/1955-1956 A.S.Rajasabai.jpg" },
        { term: "1956 - 1957", name: "G.P. Songoye", img: "/images/RCM president/1956-1957 G.P.Songoye.jpg" },
        { term: "1957 - 1958", name: "A.C. Mohamed", img: "/images/RCM president/1957-1958 A.C.Mohamed.jpg" },
        { term: "1958 - 1959", name: "L. Narayanan Chettiar", img: "/images/RCM president/1958-1959 L.Narayanan Chettiar.jpg" },
        { term: "1959 - 1960", name: "Dr.(Major). P.Govindha Rau", img: "/images/RCM president/1959-1960 Dr.(Major). P.Govindha Rau.jpg" },
        { term: "1960 - 1961", name: "R.V. Swaminathan", img: "/images/RCM president/1960-1961 R.V.Swaminathan.jpg" },
        { term: "1961 - 1962", name: "Dr. K. Balakrishnan", img: "/images/RCM president/1961-1962 Dr.K.Balakrishnan.jpg" },
        { term: "1962 - 1963", name: "Ahmed Thayoob", img: "/images/RCM president/1962-1963 Ahmed Thayoob.jpg" },
        { term: "1963 - 1964", name: "A.R. Balakrishnan", img: "/images/RCM president/1963-1964 A.R.Balakrishnan.jpg" },
        { term: "1964 - 1965", name: "K.R.K. Bhat", img: "/images/RCM president/1964-1965 K.R.K. Bhat.jpg" },
        { term: "1965 - 1966", name: "A. Koppu Menon", img: "/images/RCM president/1965-1966 A.Koppu Menon.jpg" },
        { term: "1967 - 1968", name: "N.V.C. Natarajan Chettiar", img: "/images/RCM president/1967-1968 N.V.C.Natarajan Chettiar.jpg" },
        { term: "1968 - 1969", name: "V.P.R. Gangaram Durairaj", img: "/images/RCM president/1968-1969 V.P.R.Gangaram Durairaj.jpg" },
        { term: "1969 - 1970", name: "T. Manickavasagam", img: "/images/RCM president/1969-1970 T. Manickavasagam.jpg" },
        { term: "1970 - 1971", name: "M.P.V. Krishnamoorthy (July 1970)", img: "/images/RCM president/1970-1971 - July1970 -  M.P.V.Krishnamoorthy.jpg" },
        { term: "1970 - 1971", name: "Dr. K.A. Kalyanam (Nov 1970)", img: "/images/RCM president/1970-1971 - Nov1970 - Dr.K.A.Kalyanam.jpg" },
        { term: "1970 - 1971", name: "S. Chidambaranathan", img: "/images/RCM president/1970-1971 S.Chidambaranathan.jpg" },
        { term: "1971 - 1972", name: "S. Chidambaranathan", img: "/images/RCM president/1971-1972  S.Chidambaranathan.jpg" },
        { term: "1972 - 1973", name: "P.C.M. Balakrishnan", img: "/images/RCM president/1972-1973 P.C.M.Balakrishnan.jpg" },
        { term: "1973 - 1974", name: "Dr. A.A. Sathar", img: "/images/RCM president/1973-1974 Dr.A.A.Sathar.jpg" },
        { term: "1975 - 1976", name: "N.M.R.V. Mahadevan", img: "/images/RCM president/1975-1976 N.M.R.V. Mahadevan.jpg" },
        { term: "1976 - 1977", name: "K.M.S.L. Yathindran", img: "/images/RCM president/1976-1977 K.M.S.L.Yathindran.jpg" },
        { term: "1977 - 1978", name: "P.M. Kathiresan", img: "/images/RCM president/1977-1978 P.M.Kathiresan.jpg" },
        { term: "1979 - 1980", name: "K.M. Syed Ibrahim", img: "/images/RCM president/1979-1980 K.M.Syed Ibrahim.jpg" },
        { term: "1980 - 1981", name: "Peri Thiagaraj", img: "/images/RCM president/1980-1981 Peri Thiagaraj 2x3.jpg" },
        { term: "1981 - 1982", name: "I.C. Kanagapandian", img: "/images/RCM president/1981-1982 I.C.Kanagapandian.jpg" },
        { term: "1982 - 1983", name: "M. Vaidyalingam", img: "/images/RCM president/1982-1983 M.Vaidyalinga m.jpg" },
        { term: "1983 - 1984", name: "V. Nagoor Pitchai", img: "/images/RCM president/1983-1984 V.Nagoor Pitchai.jpg" },
        { term: "1984 - 1985", name: "Brij Mohan Gupta", img: "/images/RCM president/1984-1985 Brij Mohan Gupta.jpg" },
        { term: "1985 - 1986", name: "A. Jawahar", img: "/images/RCM president/1985-1986 A.Jawahar.jpg" },
        { term: "1986 - 1987", name: "S. Venkatasubramanyan", img: "/images/RCM president/1986-1987 S.Venkatasubramanyan.jpg" },
        { term: "1987 - 1988", name: "A.C. Essa", img: "/images/RCM president/1987-1988 A.C. Essa.jpg" },
        { term: "1988 - 1989", name: "K. Ramachandran", img: "/images/RCM president/1988-1989 K.Ramachandran.jpg" },
        { term: "1989 - 1990", name: "N.M.R. Jumunathan", img: "/images/RCM president/1989-1990 N.M.R.Jumunathan.jpg" },
        { term: "1990 - 1991", name: "M.K. Jawahar Bapu", img: "/images/RCM president/1990-1991 M.K.Jawahar Bapu.jpg" },
        { term: "1991 - 1992", name: "Dr. R. Purnachandra Rao", img: "/images/RCM president/1991-92 Dr.R.Purnachandra Rao.jpg" },
        { term: "1992 - 1993", name: "K. Venkateshwaran", img: "/images/RCM president/1992-1993 K.Venkateshwaran.jpg" },
        { term: "1993 - 1994", name: "V.S.M.G. Manohar", img: "/images/RCM president/1993-1994 V.S.M.G.Manohar.jpg" },
        { term: "1994 - 1995", name: "S. Rajasekaran", img: "/images/RCM president/1994 - 1995 S.Rajasekaran.bmp" },
        { term: "1995 - 1996", name: "A.H.S.K. Venugopalan", img: "/images/RCM president/1995-1996 A.H.S.K. Venugopalan.jpg" },
        { term: "1996 - 1997", name: "T. Murugesan", img: "/images/RCM president/1996-1997 T.Murugesan.jpg" },
        { term: "1997 - 1998", name: "M. Mohun", img: "/images/RCM president/1997-1998 M.Mohun.jpg" },
        { term: "1998 - 1999", name: "M.V.P. Dhayalavel", img: "/images/RCM president/1998-1999 M.V.P.Dhayalavel.jpg" },
        { term: "1999 - 2000", name: "K. Arumugasamy", img: "/images/RCM president/1999-2000 K.Arumugasamy.jpg" },
        { term: "2000 - 2001", name: "J.P. Jeyasuresh Jayaraj", img: "/images/RCM president/2000-2001 J.P.Jeyasuresh Jayaraj.jpeg" },
        { term: "2001 - 2002", name: "K.L.Y. Sasidharan", img: "/images/RCM president/2001 - 2002 K.L.Y.Sasidharan.bmp" },
        { term: "2002 - 2003", name: "V.V.B. Jeyasubramanian", img: "/images/RCM president/2002-2003 V.V.B.Jeyasubramanian.jpg" },
        { term: "2003 - 2004", name: "G. Pichaimani", img: "/images/RCM president/2003-2004 G.Pichaimani.jpg" },
        { term: "2004 - 2005", name: "S.R. Chandra Guptha", img: "/images/RCM president/2004-2005 S.R.Chandra Guptha.jpg" },
        { term: "2005 - 2006", name: "Dr. S. Subramanian", img: "/images/RCM president/2005-2006 Dr.S.Subramanian.jpg" },
        { term: "2006 - 2007", name: "E.R. Kumaresan", img: "/images/RCM president/2006-2007 E.R.Kumaresan.jpg" },
        { term: "2007 - 2008", name: "S.T. Sureshkumar", img: "/images/RCM president/2007-2008 S.T. Sureshkumar.jpg" },
        { term: "2008 - 2009", name: "P.J. Sridhar", img: "/images/RCM president/2008-2009 P.J.Sridhar.jpg" },
        { term: "2009 - 2010", name: "A. Gopinath", img: "/images/RCM president/2009-2010 A.Gopinath.jpg" },
        { term: "2010 - 2011", name: "P. Karmegamani", img: "/images/RCM president/2010-2011 P.Karmegamani.jpg" },
        { term: "2011 - 2012", name: "S.P. Kaarthick", img: "/images/RCM president/2011-2012 S.P.Kaarthick.JPG" },
        { term: "2012 - 2013", name: "RM. Subramanian", img: "/images/RCM president/2012-2013 RM.Subramanian.jpg" },
        { term: "2013 - 2014", name: "S. Chindambaram", img: "/images/RCM president/2013-2014 S.Chindambaram.jpg" },
        { term: "2014 - 2015", name: "K. Sethuram", img: "/images/RCM president/2014-2015 K.Sethuram.jpg" },
        { term: "2015 - 2016", name: "R. Sivarajah", img: "/images/RCM president/2015-2016 R.Sivarajah.jpg" },
        { term: "2016 - 2017", name: "P.T. Krishnamurthy", img: "/images/RCM president/2016-2017 P.T.Krishnamurthy.jpg" },
        { term: "2017 - 2018", name: "T.K. Sivakumar", img: "/images/RCM president/2017-2018 T.K.Sivakumar.JPG" },
        { term: "2018 - 2019", name: "J.S. Hariram", img: "/images/RCM president/2018-2019 J.S. Hariram.jpg" },
        { term: "2019 - 2020", name: "Rajan Chedda", img: "/images/RCM president/2019-2020 -Rajan Chedda.jpg" },
        { term: "2021 - 2022", name: "A.F. Antony Premkumar", img: "/images/RCM president/2021-2022 A.F.Antony Premkumar.jpg" },
        { term: "2022 - 2023", name: "K.K. Chandran", img: "/images/RCM president/2022-2023 K.K.Chandran.jpg" },
        { term: "2023 - 2024", name: "J.M. Saravanan", img: "/images/RCM president/2023-2024 J.M.Saravanan.jpg" },
        { term: "2024 - 2025", name: "B.R. Baskar", img: "/images/RCM president/2024-2025 B.R.Baskar.jpg" },
        { term: "2024 - 2025", name: "S.K. Rajaprabhu", img: "/images/RCM president/2024-2025 S.K.Rajaprabhu.jpeg" },
        { term: "2025 - 2026", name: "M. Balasubramaniyam", img: "/images/RCM president/2025-2026 M.Balasubramaniyam.jpeg" },
        { term: "2026 - 2027", name: "Mukesh J Jain", img: "/images/RCM president/2026-2027 Mukesh J Jain.jpeg" }
    ];

    const jubileePhotos = [
        { title: "Silver Jubilee (25 Years) Members", img: "/images/RCM president/01 - Silver Jubilee (25) year Members.JPG", year: "1963" },
        { title: "Diamond Jubilee (60 Years) Members", img: "/images/RCM president/02 - Diamond Jubilee (60) Year Members.jpg", year: "1998" },
        { title: "Platinum Jubilee (75 Years) Members", img: "/images/RCM president/03 - Platinum Jubilee (75) - Members.JPG", year: "2013" },
        { title: "Platinum Jubilee (75 Years) Family", img: "/images/RCM president/03 - Platinum jubilee (75) year -Family.JPG", year: "2013" }
    ];

    const decades = ['All', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];

    const getDecadeStart = (yearStr) => {
        const yr = parseInt(yearStr.split(' ')[0]);
        if (isNaN(yr)) return 0;
        return Math.floor(yr / 10) * 10;
    };

    const filteredPresidents = useMemo(() => {
        return pastPresidents.filter(pres => {
            const matchesSearch = pres.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  pres.term.includes(searchTerm);
            
            if (selectedDecade === 'All') return matchesSearch;
            
            const decadeVal = parseInt(selectedDecade.substring(0, 4));
            const presDecade = getDecadeStart(pres.term);
            
            return matchesSearch && presDecade === decadeVal;
        });
    }, [searchTerm, selectedDecade]);

    const handleImageError = (e, name) => {
        e.target.style.display = 'none';
        const parent = e.target.parentNode;
        if (parent && !parent.querySelector('.avatar-fallback')) {
            const fallback = document.createElement('div');
            fallback.className = 'avatar-fallback';
            fallback.style.width = '100%';
            fallback.style.height = '100%';
            fallback.style.display = 'flex';
            fallback.style.alignItems = 'center';
            fallback.style.justifyContent = 'center';
            fallback.style.backgroundColor = 'var(--primary-light)';
            fallback.style.color = 'var(--primary)';
            fallback.style.fontWeight = 'bold';
            fallback.style.fontSize = '1.8rem';
            
            const initials = name.split(' ').map(n => n[0]).filter((n, i) => i < 2).join('').toUpperCase();
            fallback.textContent = initials || 'RC';
            parent.appendChild(fallback);
        }
    };

    return (
        <div style={{ backgroundColor: 'var(--bg-light)', minHeight: '100vh', paddingBottom: '80px' }}>
            {/* Hero Header */}
            <section style={{ 
                background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', 
                color: 'white', 
                padding: '100px 0 80px 0', 
                textAlign: 'center',
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
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <span className="badge" style={{ backgroundColor: 'var(--primary)', color: 'white', border: 'none', padding: '6px 18px' }}>
                        Club Leadership
                    </span>
                    <h1 style={{ fontSize: '3rem', fontWeight: '800', margin: '20px 0', color: 'white' }}>
                        Our Members & Leaders
                    </h1>
                    <p style={{ maxWidth: '700px', margin: '0 auto', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                        Celebrating the dedicated visionaries of the Rotary Club of Madurai who have guided our mission of "Service Above Self" since 1938.
                    </p>
                </div>
            </section>

            {/* Tab System Nav */}
            <section className="container" style={{ marginTop: '-30px', position: 'relative', zIndex: 10 }}>
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    padding: '8px',
                    boxShadow: 'var(--shadow-lg)',
                    border: '1.5px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'center',
                    maxWidth: '600px',
                    margin: '0 auto',
                    gap: '8px'
                }}>
                    <button 
                        onClick={() => { setActiveTab('presidents'); setSelectedDecade('All'); setSearchTerm(''); }}
                        style={{
                            flex: 1,
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '14px',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            backgroundColor: activeTab === 'presidents' ? 'var(--primary)' : 'transparent',
                            color: activeTab === 'presidents' ? 'white' : 'var(--secondary)'
                        }}
                    >
                        <Award size={18} />
                        Past Presidents
                    </button>
                    <button 
                        onClick={() => { setActiveTab('charter'); setSearchTerm(''); }}
                        style={{
                            flex: 1,
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '14px',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            backgroundColor: activeTab === 'charter' ? 'var(--primary)' : 'transparent',
                            color: activeTab === 'charter' ? 'white' : 'var(--secondary)'
                        }}
                    >
                        <Users size={18} />
                        Charter Members
                    </button>
                    <button 
                        onClick={() => { setActiveTab('jubilee'); setSearchTerm(''); }}
                        style={{
                            flex: 1,
                            padding: '12px 24px',
                            border: 'none',
                            borderRadius: '14px',
                            fontSize: '1rem',
                            fontWeight: '700',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            backgroundColor: activeTab === 'jubilee' ? 'var(--primary)' : 'transparent',
                            color: activeTab === 'jubilee' ? 'white' : 'var(--secondary)'
                        }}
                    >
                        <ImageIcon size={18} />
                        Jubilee Archives
                    </button>
                </div>
            </section>

            {/* Filter Bar (Only for Presidents) */}
            {activeTab === 'presidents' && (
                <section className="container" style={{ marginTop: '40px' }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '20px',
                        border: '1.5px solid var(--border-color)',
                        boxShadow: 'var(--shadow-sm)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px'
                    }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ position: 'relative', flexGrow: 1, maxWidth: '400px' }}>
                                <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input 
                                    type="text" 
                                    placeholder="Search president by name or year..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 46px',
                                        borderRadius: '30px',
                                        border: '1.5px solid var(--border-color)',
                                        outline: 'none',
                                        fontSize: '0.92rem'
                                    }}
                                />
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Calendar size={18} style={{ color: 'var(--primary)' }} />
                                <span style={{ fontWeight: '700', color: 'var(--secondary)', fontSize: '0.92rem' }}>Filter by Decade:</span>
                            </div>
                        </div>

                        {/* Decade tags */}
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {decades.map(dec => (
                                <button
                                    key={dec}
                                    onClick={() => setSelectedDecade(dec)}
                                    style={{
                                        border: '1.5px solid',
                                        borderColor: selectedDecade === dec ? 'var(--primary)' : 'var(--border-color)',
                                        backgroundColor: selectedDecade === dec ? 'var(--primary-light)' : 'transparent',
                                        color: selectedDecade === dec ? 'var(--primary)' : 'var(--secondary)',
                                        padding: '6px 16px',
                                        borderRadius: '20px',
                                        fontSize: '0.88rem',
                                        fontWeight: '700',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {dec}
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Display Grids */}
            <section className="container" style={{ marginTop: '40px' }}>
                {/* 1. Presidents Grid */}
                {activeTab === 'presidents' && (
                    <>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '30px' }}>
                            {filteredPresidents.map((pres, idx) => (
                                <div key={idx} className="tilt-card" style={{
                                    backgroundColor: 'white',
                                    borderRadius: '20px',
                                    border: '1.5px solid var(--border-color)',
                                    overflow: 'hidden',
                                    boxShadow: 'var(--shadow-sm)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '24px 16px',
                                    textAlign: 'center',
                                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                                }}>
                                    <div style={{ 
                                        width: '130px', 
                                        height: '130px', 
                                        borderRadius: '50%', 
                                        overflow: 'hidden', 
                                        border: '4px solid var(--primary-light)',
                                        backgroundColor: '#F8FAFC',
                                        marginBottom: '16px',
                                        position: 'relative'
                                    }}>
                                        <img 
                                            src={getCloudinaryUrl(pres.img)} 
                                            alt={pres.name}
                                            onError={(e) => handleImageError(e, pres.name)}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <span style={{ 
                                        fontSize: '0.78rem', 
                                        fontWeight: '800', 
                                        color: 'var(--primary)', 
                                        backgroundColor: 'var(--primary-light)', 
                                        padding: '4px 12px', 
                                        borderRadius: '20px',
                                        marginBottom: '10px'
                                    }}>
                                        {pres.term}
                                    </span>
                                    <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--secondary)', margin: 0, lineHeight: '1.3' }}>
                                        {pres.name}
                                    </h3>
                                </div>
                            ))}
                        </div>

                        {filteredPresidents.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
                                <Users size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
                                <p>No presidents found matching your filter criteria.</p>
                            </div>
                        )}
                    </>
                )}

                {/* 2. Charter Members Grid */}
                {activeTab === 'charter' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(225px, 1fr))', gap: '30px' }}>
                        {charterMembers.map((charter, idx) => (
                            <div key={idx} className="tilt-card" style={{
                                backgroundColor: 'white',
                                borderRadius: '20px',
                                border: '1.5px solid var(--border-color)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-sm)',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                padding: '24px 16px',
                                textAlign: 'center',
                                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                            }}>
                                <div style={{ 
                                    width: '130px', 
                                    height: '130px', 
                                    borderRadius: '50%', 
                                    overflow: 'hidden', 
                                    border: '4px solid var(--primary-light)',
                                    backgroundColor: '#F8FAFC',
                                    marginBottom: '16px',
                                    position: 'relative'
                                }}>
                                    <img 
                                        src={getCloudinaryUrl(charter.img)} 
                                        alt={charter.name}
                                        onError={(e) => handleImageError(e, charter.name)}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <span style={{ 
                                    fontSize: '0.78rem', 
                                    fontWeight: '800', 
                                    color: 'var(--primary)', 
                                    backgroundColor: 'var(--primary-light)', 
                                    padding: '4px 12px', 
                                    borderRadius: '20px',
                                    marginBottom: '10px'
                                }}>
                                    {charter.designation}
                                </span>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'var(--secondary)', margin: 0, lineHeight: '1.3' }}>
                                    {charter.name}
                                </h3>
                            </div>
                        ))}
                    </div>
                )}

                {/* 3. Jubilee Archive Gallery */}
                {activeTab === 'jubilee' && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '30px' }}>
                        {jubileePhotos.map((jub, idx) => (
                            <div key={idx} style={{
                                backgroundColor: 'white',
                                borderRadius: '24px',
                                border: '1.5px solid var(--border-color)',
                                overflow: 'hidden',
                                boxShadow: 'var(--shadow-md)',
                                transition: 'transform 0.3s'
                            }}
                            className="tilt-card"
                            >
                                <div style={{ height: '240px', overflow: 'hidden', backgroundColor: '#0F172A', position: 'relative' }}>
                                    <img 
                                        src={getCloudinaryUrl(jub.img)} 
                                        alt={jub.title}
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.parentNode.style.display = 'flex';
                                            e.target.parentNode.style.alignItems = 'center';
                                            e.target.parentNode.style.justifyContent = 'center';
                                            e.target.parentNode.style.color = 'rgba(255,255,255,0.4)';
                                        }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <span style={{
                                        position: 'absolute',
                                        top: '16px',
                                        right: '16px',
                                        backgroundColor: 'var(--primary)',
                                        color: 'white',
                                        fontWeight: '700',
                                        fontSize: '0.85rem',
                                        padding: '4px 14px',
                                        borderRadius: '20px'
                                    }}>
                                        Year {jub.year}
                                    </span>
                                </div>
                                <div style={{ padding: '24px' }}>
                                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--secondary)', margin: 0 }}>
                                        {jub.title}
                                    </h3>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px', lineHeight: '1.5' }}>
                                        Archival group photograph commemorating the historic milestone anniversary of the Rotary Club of Madurai.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
