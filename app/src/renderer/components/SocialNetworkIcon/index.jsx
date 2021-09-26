import React from 'react';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import EmailIcon from '@material-ui/icons/Email';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PinterestIcon from '@material-ui/icons/Pinterest';
import TwitterIcon from '@material-ui/icons/Twitter';
import RedditIcon from '@material-ui/icons/Reddit';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';

const isEmail = (string) => {
  const Regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  return Regex.test(string);
};

const SocialNetworkIcon = ({ link, height, width }) => {
  return isEmail(link) ? (
    <EmailIcon style={{ height: height, width: width, color: '#b9bbbe' }} />
  ) : link.toLowerCase().includes('linkedin') ? (
    <LinkedInIcon style={{ height: height, width: width, color: '#0a63bc' }} />
  ) : link.toLowerCase().includes('facebook') ? (
    <FacebookIcon style={{ height: height, width: width, color: '#1877f2' }} />
  ) : link.toLowerCase().includes('pinterest') ? (
    <PinterestIcon
      style={{
        height: height,
        width: width,
        color: '#c61e26',
        paddingTop: 2,
        paddingBottom: 2,
      }}
    />
  ) : link.toLowerCase().includes('twitter') ? (
    <TwitterIcon
      style={{
        height: height,
        width: width,
        color: '#03a5ec',
        paddingTop: 2,
        paddingBottom: 2,
      }}
    />
  ) : link.toLowerCase().includes('reddit') ? (
    <RedditIcon
      style={{
        height: height,
        width: width,
        color: '#f74300',
        paddingTop: 2,
        paddingBottom: 2,
      }}
    />
  ) : link.toLowerCase().includes('youtube') ? (
    <YouTubeIcon
      style={{
        height: height,
        width: width,
        color: '#f70000',
      }}
    />
  ) : link.toLowerCase().includes('instagram') ? (
    <InstagramIcon
      style={{
        height: height,
        width: width,
        color: '#fff',
        paddingTop: 2,
        paddingBottom: 2,
      }}
    />
  ) : link.toLowerCase().includes('github') ? (
    <GitHubIcon
      style={{
        height: height,
        width: width,
        color: '#fff',
        paddingTop: 5,
        paddingBottom: 5,
      }}
    />
  ) : (
    <AccountBoxIcon
      style={{ height: height, width: width, color: '#b9bbbe' }}
    />
  );
};

export default SocialNetworkIcon;
