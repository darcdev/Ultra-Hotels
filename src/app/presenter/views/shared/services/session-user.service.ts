import { Injectable } from '@angular/core';
import { Session } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { SupabaseService } from '@/app/core/services/supabase/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class SessionUserService {
  private sessionSubject = new BehaviorSubject<Session | null>(null);
  session$ = this.sessionSubject.asObservable();

  constructor(private supabaseService: SupabaseService) {
    this.supabaseService.supabase.auth.onAuthStateChange((event, session) => {
      this.sessionSubject.next(session);
    });
  }

  getUserSession(): Session | null {
    return this.sessionSubject.value;
  }
}
