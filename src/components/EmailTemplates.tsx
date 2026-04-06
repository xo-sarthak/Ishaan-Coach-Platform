import * as React from 'react';

interface ResourceEmailProps {
  resourceTitle: string;
  downloadUrl: string;
}

export const ResourceEmailTemplate: React.FC<Readonly<ResourceEmailProps>> = ({
  resourceTitle,
  downloadUrl,
}) => (
  <div style={{ fontFamily: 'serif', padding: '20px', color: '#333' }}>
    <h1 style={{ color: '#B05C46' }}>Your Free Resource is Ready!</h1>
    <p>Hi there,</p>
    <p>Thank you for your interest in <strong>{resourceTitle}</strong>. I'm excited for you to dive in and start your growth journey.</p>
    <p>You can access and download your resource instantly by clicking the button below:</p>
    <a 
      href={downloadUrl} 
      style={{
        display: 'inline-block',
        padding: '12px 24px',
        backgroundColor: '#B05C46',
        color: '#fff',
        textDecoration: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        marginTop: '20px'
      }}
    >
      Download {resourceTitle}
    </a>
    <p style={{ marginTop: '40px' }}>To your growth,<br /><strong>Ishaan Singh</strong></p>
    <hr style={{ border: 'none', borderTop: '1px solid #eee', marginTop: '40px' }} />
    <p style={{ fontSize: '12px', color: '#999' }}>
      ishaanlive.in | B 37 Ashoka Apartment Sector 9 Rohini, Delhi
    </p>
  </div>
);

interface CohortWelcomeEmailTemplateProps {
  cohortTitle: string;
  startDate: string;
}

export const CohortWelcomeEmailTemplate: React.FC<Readonly<CohortWelcomeEmailTemplateProps>> = ({
  cohortTitle,
  startDate,
}) => (
  <div style={{ fontFamily: 'serif', padding: '20px', color: '#333', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#B05C46', fontSize: '28px', marginBottom: '20px' }}>You're In! Welcome to {cohortTitle}</h1>
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>Hi there,</p>
    <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
      Huge congratulations on taking this step. You've officially secured your spot in the upcoming <strong>{cohortTitle}</strong>. 
    </p>
    
    <div style={{ backgroundColor: '#FCF8F7', padding: '24px', borderRadius: '16px', marginTop: '24px', border: '1px solid #F2E3E0' }}>
      <p style={{ margin: 0, fontSize: '16px' }}><strong>Program Starts:</strong> {startDate}</p>
      <p style={{ marginTop: '12px', fontSize: '14px', color: '#666' }}>
        <em>I will be sending you a separate calendar invite and the specific session links a few days before we kick off. Keep an eye on your inbox!</em>
      </p>
    </div>

    <p style={{ marginTop: '30px', fontSize: '16px', lineHeight: '1.6' }}>
      I'm really excited to help you navigate this journey. Get ready for an intense, high-accountability experience that will change the way you look at your life and relationships.
    </p>
    
    <p style={{ marginTop: '40px', fontSize: '16px' }}>
      See you inside,<br />
      <strong style={{ color: '#B05C46', fontSize: '20px' }}>Ishaan Singh</strong>
    </p>
    
    <hr style={{ border: 'none', borderTop: '1px solid #eee', marginTop: '40px' }} />
    <p style={{ fontSize: '12px', color: '#999', textAlign: 'center' }}>
      ishaanlive.in | Rohini, Delhi, India
    </p>
  </div>
);
