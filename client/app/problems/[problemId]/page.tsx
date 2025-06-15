'use client'
import React, { useState, useEffect, useRef } from 'react'
// import { GetServerSidePropsContext, GetServerSideProps } from 'next';
import axios from 'axios';
import { useParams } from 'next/navigation'

const Problem = () => {
    const params = useParams();
    return (
        <div>Problem</div>
    )
}

export default Problem