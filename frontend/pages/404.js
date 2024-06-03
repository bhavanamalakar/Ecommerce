import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/header';
import Footer from '@/components/footer';
export default function Custom404() {
    return (
        <>
            <Header />
            <div style={{ backgroundColor: 'white', textAlign:'center' }}>
                <h1>404 - Page Not Found</h1>
                <Link style={{color:'black'}} href='/'>The page you are looking for does not exist.</Link>
                <div className="mx-100">
                    <Image style={{position:'relative'}} className='mx-5' src="/img/bg-img/404.png" alt="404" width="1000" height="1000" />
                </div>
                
            </div>
            <Footer />
        </>

    );
}
